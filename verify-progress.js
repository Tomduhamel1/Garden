#!/usr/bin/env node

/**
 * Garden Progress Verification Script
 * Checks actual system state vs recorded state
 * Run at the start and end of each Claude session
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

class ProgressVerifier {
  constructor() {
    this.results = {
      timestamp: new Date().toISOString(),
      checks: {},
      discrepancies: [],
      warnings: [],
      summary: {}
    };
  }

  // Check if a file exists
  fileExists(filePath) {
    try {
      return fs.existsSync(path.join(process.cwd(), filePath));
    } catch {
      return false;
    }
  }

  // Check if a directory exists
  dirExists(dirPath) {
    try {
      const stats = fs.statSync(path.join(process.cwd(), dirPath));
      return stats.isDirectory();
    } catch {
      return false;
    }
  }

  // Count files in a directory matching a pattern
  countFiles(dirPath, pattern = '*') {
    try {
      const fullPath = path.join(process.cwd(), dirPath);
      if (!this.dirExists(dirPath)) return 0;
      
      const files = fs.readdirSync(fullPath);
      if (pattern === '*') return files.length;
      
      const regex = new RegExp(pattern);
      return files.filter(f => regex.test(f)).length;
    } catch {
      return 0;
    }
  }

  // Get list of files in directory
  listFiles(dirPath, pattern = null) {
    try {
      const fullPath = path.join(process.cwd(), dirPath);
      if (!this.dirExists(dirPath)) return [];
      
      let files = fs.readdirSync(fullPath);
      if (pattern) {
        const regex = new RegExp(pattern);
        files = files.filter(f => regex.test(f));
      }
      return files;
    } catch {
      return [];
    }
  }

  // Check database connection (PostgreSQL)
  async checkDatabase() {
    const check = {
      postgresInstalled: false,
      gardenDatabaseExists: false,
      tablesCreated: false,
      hasOrderModel: false,
      hasJSONBColumns: false,
      error: null
    };

    try {
      // Check if PostgreSQL is installed
      execSync('which psql', { stdio: 'ignore' });
      check.postgresInstalled = true;
      
      // Check if garden database exists
      try {
        const dbList = execSync('psql -U postgres -lqt 2>/dev/null || psql -lqt 2>/dev/null', { encoding: 'utf8' });
        check.gardenDatabaseExists = dbList.includes('garden');
      } catch {
        check.gardenDatabaseExists = false;
      }
      
      // Check for Order model with JSONB
      if (this.fileExists('backend/models/order.js')) {
        const orderModel = fs.readFileSync('backend/models/order.js', 'utf8');
        check.hasOrderModel = true;
        check.hasJSONBColumns = orderModel.includes('JSONB') || orderModel.includes('jsonb');
      }
      
      // Check if config exists and is for PostgreSQL
      if (this.fileExists('backend/config/config.json')) {
        const config = require(path.join(process.cwd(), 'backend/config/config.json'));
        check.hasConfig = true;
        check.configuredForPostgres = config.development?.dialect === 'postgres';
      }
    } catch (error) {
      check.error = 'PostgreSQL not installed or not accessible';
    }

    return check;
  }

  // Check backend API status
  checkBackendAPI() {
    const check = {
      structure: {},
      dependencies: {},
      endpoints: [],
      models: [],
      implementation: {
        hasAuth: false,
        hasOrderCRUD: false,
        hasCalculations: false,
        hasValidation: false
      }
    };

    // Check folder structure
    check.structure = {
      srcExists: this.dirExists('backend/src'),
      modelsExists: this.dirExists('backend/models'),
      migrationsExists: this.dirExists('backend/migrations'),
      configExists: this.fileExists('backend/config/config.json'),
      indexExists: this.fileExists('backend/src/index.js'),
      packageJsonExists: this.fileExists('backend/package.json')
    };

    // Check dependencies if package.json exists
    if (check.structure.packageJsonExists) {
      try {
        const pkg = require(path.join(process.cwd(), 'backend/package.json'));
        check.dependencies = {
          express: !!pkg.dependencies?.express,
          sequelize: !!pkg.dependencies?.sequelize,
          pg: !!pkg.dependencies?.pg,
          jwt: !!pkg.dependencies?.jsonwebtoken,
          bcrypt: !!pkg.dependencies?.bcrypt || !!pkg.dependencies?.bcryptjs,
          cors: !!pkg.dependencies?.cors,
          helmet: !!pkg.dependencies?.helmet
        };
      } catch {}
    }

    // List models
    if (check.structure.modelsExists) {
      check.models = this.listFiles('backend/models', '\\.js$');
      // Check for our actual Order model
      check.implementation.hasOrderModel = check.models.includes('order.js');
    }

    // Check for API route files
    if (this.dirExists('backend/src/routes')) {
      check.endpoints = this.listFiles('backend/src/routes', '\\.js$');
      check.implementation.hasAuth = check.endpoints.includes('auth.js');
      check.implementation.hasOrderCRUD = check.endpoints.includes('orders.js');
    }

    // Check if auth middleware exists
    if (this.fileExists('backend/src/middleware/auth.js')) {
      check.implementation.hasAuthMiddleware = true;
    }

    // Check for calculations
    if (this.dirExists('backend/src/calculations')) {
      const calcs = this.listFiles('backend/src/calculations', '\\.js$');
      check.implementation.hasCalculations = calcs.length > 0;
    }

    return check;
  }

  // Check frontend React app status
  checkFrontend() {
    const check = {
      structure: {},
      dependencies: {},
      components: [],
      routes: [],
      htmlPrototypes: []
    };

    // Check folder structure
    check.structure = {
      srcExists: this.dirExists('frontend/src'),
      componentsExists: this.dirExists('frontend/src/components'),
      publicExists: this.dirExists('frontend/public'),
      packageJsonExists: this.fileExists('frontend/package.json'),
      viteConfigExists: this.fileExists('frontend/vite.config.ts'),
      appExists: this.fileExists('frontend/src/App.tsx'),
      mainExists: this.fileExists('frontend/src/main.tsx')
    };

    // Check dependencies
    if (check.structure.packageJsonExists) {
      try {
        const pkg = require(path.join(process.cwd(), 'frontend/package.json'));
        check.dependencies = {
          react: !!pkg.dependencies?.react,
          reactDom: !!pkg.dependencies?.['react-dom'],
          vite: !!pkg.devDependencies?.vite,
          typescript: !!pkg.devDependencies?.typescript,
          tailwind: !!pkg.devDependencies?.tailwindcss,
          reactRouter: !!pkg.dependencies?.['react-router-dom'],
          zustand: !!pkg.dependencies?.zustand,
          axios: !!pkg.dependencies?.axios
        };
      } catch {}
    }

    // List components - recursively check all subdirectories
    if (check.structure.componentsExists) {
      const getAllComponentFiles = (dir) => {
        let files = [];
        try {
          const entries = fs.readdirSync(path.join(process.cwd(), dir));
          entries.forEach(entry => {
            const fullPath = path.join(dir, entry);
            const stat = fs.statSync(path.join(process.cwd(), fullPath));
            if (stat.isDirectory()) {
              files = files.concat(getAllComponentFiles(fullPath));
            } else if (entry.match(/\.(tsx|jsx)$/)) {
              files.push(entry);
            }
          });
        } catch (error) {
          // Directory doesn't exist or can't be read
        }
        return files;
      };
      check.components = getAllComponentFiles('frontend/src/components');
    }

    // Count HTML prototypes
    check.htmlPrototypes = this.listFiles('html-prototypes', '\\.html$');

    return check;
  }

  // Check tracking files
  checkTrackingFiles() {
    return {
      progressMd: this.fileExists('PROGRESS.md'),
      statusJson: this.fileExists('STATUS.json'),
      componentsJson: this.fileExists('COMPONENTS.json'),
      nextMd: this.fileExists('NEXT.md'),
      handoffMd: this.fileExists('HANDOFF.md'),
      roadmapMd: this.fileExists('PRODUCT-ROADMAP.md'),
      claudeMd: this.fileExists('CLAUDE.md')
    };
  }

  // Check Git status
  checkGitStatus() {
    const check = {
      isRepo: false,
      branch: null,
      uncommittedChanges: 0,
      lastCommit: null
    };

    try {
      // Check if it's a git repo
      execSync('git rev-parse --git-dir', { stdio: 'ignore' });
      check.isRepo = true;

      // Get current branch
      check.branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();

      // Count uncommitted changes
      const status = execSync('git status --porcelain', { encoding: 'utf8' });
      check.uncommittedChanges = status.split('\n').filter(line => line.trim()).length;

      // Get last commit
      check.lastCommit = execSync('git log -1 --pretty=format:"%h - %s (%cr)"', { encoding: 'utf8' }).trim();
    } catch {}

    return check;
  }

  // Compare with STATUS.json
  compareWithStatus() {
    if (!this.fileExists('STATUS.json')) {
      this.results.warnings.push('STATUS.json not found - cannot compare state');
      return;
    }

    try {
      const status = JSON.parse(fs.readFileSync('STATUS.json', 'utf8'));
      const components = JSON.parse(fs.readFileSync('COMPONENTS.json', 'utf8'));

      // Check component conversions - need to recursively check subdirectories
      const getAllComponents = (dir) => {
        let files = [];
        try {
          const entries = fs.readdirSync(path.join(process.cwd(), dir));
          entries.forEach(entry => {
            const fullPath = path.join(dir, entry);
            const stat = fs.statSync(path.join(process.cwd(), fullPath));
            if (stat.isDirectory()) {
              files = files.concat(getAllComponents(fullPath));
            } else if (entry.match(/\.(tsx|jsx)$/)) {
              files.push(entry.replace(/\.(tsx|jsx)$/, ''));
            }
          });
        } catch (error) {
          // Directory doesn't exist or can't be read
        }
        return files;
      };
      
      const actualComponents = getAllComponents('frontend/src/components');
      const recordedConverted = status.componentsConverted || [];
      
      recordedConverted.forEach(comp => {
        if (!actualComponents.includes(comp)) {
          this.results.discrepancies.push(`Component ${comp} recorded as converted but file not found`);
        }
      });

      // Check API endpoints
      const recordedEndpoints = status.apiEndpointsCompleted || [];
      const actualRoutes = this.listFiles('backend/src/routes', '\\.js$');
      
      if (recordedEndpoints.length > 0 && actualRoutes.length === 0) {
        this.results.discrepancies.push('API endpoints recorded but no route files found');
      }

    } catch (error) {
      this.results.warnings.push(`Error reading status files: ${error.message}`);
    }
  }

  // Generate summary
  generateSummary() {
    const backend = this.results.checks.backend;
    const frontend = this.results.checks.frontend;
    const tracking = this.results.checks.tracking;
    const db = this.results.checks.database;

    // Check ACTUAL implementation, not just folder existence
    const hasRealBackend = !!(
      backend?.implementation?.hasOrderModel &&
      backend?.implementation?.hasAuth &&
      backend?.implementation?.hasOrderCRUD
    );

    const hasRealDatabase = !!(
      db?.gardenDatabaseExists &&
      db?.hasOrderModel &&
      db?.hasJSONBColumns
    );

    const hasRealFrontend = (frontend?.components?.length || 0) > 0;

    this.results.summary = {
      backendReady: hasRealBackend,
      frontendReady: hasRealFrontend,
      databaseReady: hasRealDatabase,
      trackingComplete: Object.values(tracking || {}).filter(v => v).length >= 5,
      htmlPrototypesCount: frontend?.htmlPrototypes?.length || 0,
      componentsConverted: frontend?.components?.length || 0,
      modelsCreated: backend?.models?.length || 0,
      gitClean: this.results.checks.git?.uncommittedChanges === 0,
      overallReadiness: 'NOT_STARTED', // Will be calculated
      implementationStatus: {
        database: hasRealDatabase ? 'COMPLETE' : 'NOT_STARTED',
        authentication: backend?.implementation?.hasAuth ? 'COMPLETE' : 'NOT_STARTED',
        orderAPI: backend?.implementation?.hasOrderCRUD ? 'COMPLETE' : 'NOT_STARTED',
        calculations: backend?.implementation?.hasCalculations ? 'COMPLETE' : 'NOT_STARTED',
        componentsConverted: `${frontend?.components?.length || 0}/${frontend?.htmlPrototypes?.length || 0}`
      }
    };

    // Calculate overall readiness based on REAL implementation
    const implementedFeatures = [
      hasRealDatabase,
      backend?.implementation?.hasAuth,
      backend?.implementation?.hasOrderCRUD,
      hasRealFrontend
    ].filter(v => v).length;

    if (implementedFeatures === 4) {
      this.results.summary.overallReadiness = 'READY';
    } else if (implementedFeatures >= 2) {
      this.results.summary.overallReadiness = 'IN_PROGRESS';
    } else {
      this.results.summary.overallReadiness = 'NOT_STARTED';
    }

    // Calculate actual progress percentage
    const totalTasks = 10; // Database, Auth, CRUD, Calcs, 6 main components
    const completedTasks = [
      hasRealDatabase,
      backend?.implementation?.hasAuth,
      backend?.implementation?.hasOrderCRUD,
      backend?.implementation?.hasCalculations
    ].filter(v => v).length;
    
    this.results.summary.actualProgress = Math.round((completedTasks / totalTasks) * 100);
  }

  // Print formatted results
  printResults() {
    console.log(`\n${colors.cyan}${colors.bright}═══════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.cyan}${colors.bright}     Garden Progress Verification Report${colors.reset}`);
    console.log(`${colors.cyan}${colors.bright}═══════════════════════════════════════════${colors.reset}\n`);

    console.log(`${colors.bright}Timestamp:${colors.reset} ${this.results.timestamp}\n`);

    // Tracking Files
    console.log(`${colors.yellow}${colors.bright}📁 Tracking Files:${colors.reset}`);
    Object.entries(this.results.checks.tracking || {}).forEach(([file, exists]) => {
      const icon = exists ? `${colors.green}✓` : `${colors.red}✗`;
      console.log(`  ${icon} ${file}: ${exists ? 'Found' : 'Missing'}${colors.reset}`);
    });

    // Backend Status
    console.log(`\n${colors.yellow}${colors.bright}🔧 Backend Status:${colors.reset}`);
    const backend = this.results.checks.backend;
    if (backend) {
      console.log(`  Structure: ${backend.structure.srcExists ? `${colors.green}Ready` : `${colors.red}Not Ready`}${colors.reset}`);
      console.log(`  Models: ${backend.models.length} created`);
      console.log(`  Routes: ${backend.endpoints.length} files`);
      const depsReady = Object.values(backend.dependencies).filter(v => v).length;
      console.log(`  Dependencies: ${depsReady}/${Object.keys(backend.dependencies).length} installed`);
    }

    // Frontend Status
    console.log(`\n${colors.yellow}${colors.bright}⚛️  Frontend Status:${colors.reset}`);
    const frontend = this.results.checks.frontend;
    if (frontend) {
      console.log(`  Structure: ${frontend.structure.srcExists ? `${colors.green}Ready` : `${colors.red}Not Ready`}${colors.reset}`);
      console.log(`  HTML Prototypes: ${frontend.htmlPrototypes.length} found`);
      console.log(`  React Components: ${frontend.components.length} created`);
      console.log(`  Conversion Rate: ${Math.round((frontend.components.length / 35) * 100)}%`);
    }

    // Database Status
    console.log(`\n${colors.yellow}${colors.bright}🗄️  Database Status:${colors.reset}`);
    const db = this.results.checks.database;
    if (db) {
      console.log(`  PostgreSQL Installed: ${db.postgresInstalled ? `${colors.green}Yes` : `${colors.red}No`}${colors.reset}`);
      console.log(`  Garden Database: ${db.gardenDatabaseExists ? `${colors.green}Created` : `${colors.red}Not Created`}${colors.reset}`);
      console.log(`  Order Model: ${db.hasOrderModel ? `${colors.green}Created` : `${colors.red}Not Created`}${colors.reset}`);
      console.log(`  JSONB Columns: ${db.hasJSONBColumns ? `${colors.green}Configured` : `${colors.red}Not Configured`}${colors.reset}`);
      if (db.error) console.log(`  ${colors.red}Error: ${db.error}${colors.reset}`);
    }

    // Git Status
    console.log(`\n${colors.yellow}${colors.bright}📊 Git Status:${colors.reset}`);
    const git = this.results.checks.git;
    if (git?.isRepo) {
      console.log(`  Branch: ${git.branch}`);
      console.log(`  Uncommitted: ${git.uncommittedChanges} files`);
      console.log(`  Last Commit: ${git.lastCommit}`);
    }

    // Discrepancies
    if (this.results.discrepancies.length > 0) {
      console.log(`\n${colors.red}${colors.bright}⚠️  Discrepancies Found:${colors.reset}`);
      this.results.discrepancies.forEach(d => {
        console.log(`  ${colors.red}• ${d}${colors.reset}`);
      });
    }

    // Warnings
    if (this.results.warnings.length > 0) {
      console.log(`\n${colors.yellow}${colors.bright}⚡ Warnings:${colors.reset}`);
      this.results.warnings.forEach(w => {
        console.log(`  ${colors.yellow}• ${w}${colors.reset}`);
      });
    }

    // Summary
    console.log(`\n${colors.cyan}${colors.bright}📈 Summary:${colors.reset}`);
    const summary = this.results.summary;
    console.log(`  Overall Readiness: ${this.getReadinessColor(summary.overallReadiness)}`);
    console.log(`  Actual Progress: ${summary.actualProgress || 0}%`);
    console.log(`  Components: ${summary.componentsConverted}/${summary.htmlPrototypesCount}`);
    console.log(`  Backend: ${summary.backendReady ? `${colors.green}Ready` : `${colors.red}Not Built`}${colors.reset}`);
    console.log(`  Frontend: ${summary.frontendReady ? `${colors.green}Ready` : `${colors.red}Not Built`}${colors.reset}`);
    console.log(`  Database: ${summary.databaseReady ? `${colors.green}Ready` : `${colors.red}Not Created`}${colors.reset}`);
    console.log(`  Tracking: ${summary.trackingComplete ? `${colors.green}Complete` : `${colors.yellow}Partial`}${colors.reset}`);
    
    if (summary.implementationStatus) {
      console.log(`\n${colors.cyan}${colors.bright}📊 Implementation Status:${colors.reset}`);
      console.log(`  Database Setup: ${summary.implementationStatus.database === 'COMPLETE' ? `${colors.green}✓` : `${colors.red}✗`}${colors.reset}`);
      console.log(`  Authentication: ${summary.implementationStatus.authentication === 'COMPLETE' ? `${colors.green}✓` : `${colors.red}✗`}${colors.reset}`);
      console.log(`  Order CRUD API: ${summary.implementationStatus.orderAPI === 'COMPLETE' ? `${colors.green}✓` : `${colors.red}✗`}${colors.reset}`);
      console.log(`  Calculations: ${summary.implementationStatus.calculations === 'COMPLETE' ? `${colors.green}✓` : `${colors.red}✗`}${colors.reset}`);
      console.log(`  Components: ${summary.implementationStatus.componentsConverted}`);
    }

    console.log(`\n${colors.cyan}${colors.bright}═══════════════════════════════════════════${colors.reset}\n`);
  }

  getReadinessColor(status) {
    switch(status) {
      case 'READY': return `${colors.green}${colors.bright}READY${colors.reset}`;
      case 'IN_PROGRESS': return `${colors.yellow}${colors.bright}IN PROGRESS${colors.reset}`;
      default: return `${colors.red}${colors.bright}NOT STARTED${colors.reset}`;
    }
  }

  // Save results to file
  saveResults() {
    const outputPath = path.join(process.cwd(), 'verification-report.json');
    fs.writeFileSync(outputPath, JSON.stringify(this.results, null, 2));
    console.log(`${colors.green}Report saved to: verification-report.json${colors.reset}`);
  }

  // Main verification process
  async run() {
    console.log(`${colors.cyan}Starting progress verification...${colors.reset}\n`);

    // Run all checks
    this.results.checks.tracking = this.checkTrackingFiles();
    this.results.checks.backend = this.checkBackendAPI();
    this.results.checks.frontend = this.checkFrontend();
    this.results.checks.database = await this.checkDatabase();
    this.results.checks.git = this.checkGitStatus();

    // Compare with recorded state
    this.compareWithStatus();

    // Generate summary
    this.generateSummary();

    // Print results
    this.printResults();

    // Save to file
    this.saveResults();

    // Return exit code based on readiness
    return this.results.summary.overallReadiness === 'NOT_STARTED' ? 1 : 0;
  }
}

// Run if called directly
if (require.main === module) {
  const verifier = new ProgressVerifier();
  verifier.run().then(exitCode => {
    process.exit(exitCode);
  }).catch(error => {
    console.error(`${colors.red}Error: ${error.message}${colors.reset}`);
    process.exit(1);
  });
}

module.exports = ProgressVerifier;