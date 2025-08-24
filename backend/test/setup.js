const { Sequelize } = require('sequelize');

// Mock database for tests
const sequelize = new Sequelize('sqlite::memory:', {
  logging: false,
  dialectModule: require('sqlite3')
});

// Global test setup
beforeAll(async () => {
  // Set test environment
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test-secret-key';
});

afterAll(async () => {
  // Cleanup after all tests
  if (sequelize) {
    await sequelize.close();
  }
});

// Setup and teardown for each test
beforeEach(async () => {
  // Clear database before each test
  if (sequelize) {
    await sequelize.sync({ force: true });
  }
});

module.exports = {
  sequelize
};