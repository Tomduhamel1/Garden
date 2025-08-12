# Garden Product Roadmap 🌱

## Executive Summary
Build a lean, focused title/escrow software MVP in 4 weeks that can handle real transactions for your title company, then iterate based on usage to reach market readiness in 3 months.

**Key Constraints:**
- Timeline: 1 month to MVP
- Team: 2 developers
- Budget: $10K first year
- Funding: Self-funded
- Target Price: $500/mo (vs Qualia's $1500/mo)

## Phase 0: Foundation (Week 1)
**Goal**: Core infrastructure and data model

### Technical Setup
- PostgreSQL with JSONB for flexible schema (supports 1,150+ fields)
- Node.js/Express API with JWT auth
- React/TypeScript frontend
- Deploy on Railway.app or Render (cheapest, ~$20/mo)

### Core Data Model
- Implement orders table with JSONB columns (cdf_data, contacts_data, etc.)
- Create base API endpoints (CRUD for orders)
- Setup authentication (single tenant for now)

### Must Build:
1. Database schema from SCHEMA-GUIDE.md
2. Order creation/retrieval API
3. Basic auth system
4. Frontend shell with routing

### Week 1 Deliverables:
- [ ] PostgreSQL database running with JSONB schema
- [ ] Sequelize models configured
- [ ] Basic CRUD API for orders
- [ ] JWT authentication working
- [ ] React app with routing
- [ ] Deployed to staging environment

## Phase 1: MVP (Weeks 2-4)
**Goal**: Minimum viable product for internal use

### Week 2: CD Creation & Editing
**Priority HTML Prototypes to Convert:**
1. `loan-terms.html` - Loan Terms (Critical)
2. `origination-charges.html` - Section A
3. `did-not-shop-for.html` - Section B
4. `did-shop-for.html` - Section C
5. `taxes-and-fees.html` - Section E
6. `prepaids.html` - Section F
7. `escrow.html` - Section G
8. `other-charges.html` - Section H
9. `cash-to-close.html` - Final calculations
10. `basic-info.html` - Transaction details

**Technical Tasks:**
- Implement real-time calculation engine
- Create section totals and validation
- Build form state management
- Add auto-save functionality

### Week 3: Document Generation
**Core Features:**
- CD PDF generation (using react-pdf or puppeteer)
- HUD-1 PDF generation
- Check printing (PDF format initially)
- Basic ledger (receipts/disbursements balance)

**Implementation:**
- Create PDF templates matching federal standards
- Build check template with MICR line placeholder
- Implement ledger calculations
- Add print stylesheets

### Week 4: Integration & Testing
**Integration Tasks:**
- Connect to existing fee API
- End-to-end transaction flow testing
- Fix critical bugs
- Deploy to production

**Testing Checklist:**
- [ ] Create complete purchase transaction
- [ ] Create complete refinance transaction
- [ ] Generate CD PDF - verify format
- [ ] Generate HUD PDF - verify format
- [ ] Print checks - verify format
- [ ] Ledger balances to zero
- [ ] All calculations match manual verification

### MVP Success Criteria:
✅ Create/edit real estate transactions
✅ Generate compliant CD and HUD PDFs
✅ Print checks as PDFs
✅ Calculate all fees/taxes correctly
✅ Pull fees from API
✅ Basic ledger functionality
✅ Handle 10 real transactions without errors

## Phase 2: Production Ready (Months 2-3)
**Goal**: Stable system for daily use by your title company

### Month 2: Reliability & UX
**Core Improvements:**
- Comprehensive error handling and validation
- Implement auto-save every 30 seconds
- Create transaction templates/presets
- Add file versioning/history
- Improve UI/UX based on daily usage
- Add remaining HTML prototypes as React components

**Additional Prototypes to Convert:**
- All contacts pages (borrower, seller, agents)
- All proceeds pages
- Settlement statement pages
- Property pages
- Payoffs pages

### Month 3: Enhanced Features
**New Capabilities:**
- OCR for CD import (using AWS Textract - pay per use)
- Bulk operations (multiple orders)
- Advanced search/filter
- Basic reporting dashboard
- Email notifications
- Automated backup system

**Quality Improvements:**
- Performance optimization (<2 sec load times)
- Mobile responsive design
- Keyboard shortcuts
- Undo/redo functionality

## Phase 3: Market Ready (Months 4-6)
**Goal**: Prepare for external customers

### Multi-tenancy & Security
**Architecture Changes:**
- Convert to multi-tenant architecture
- Implement organization management
- Role-based access control (RBAC)
- Audit logging
- Data isolation per tenant

**Security Enhancements:**
- SSL/TLS everywhere
- Encryption at rest
- PII data masking
- Session management
- 2FA authentication

### Compliance & Quality
**Compliance Features:**
- TRID compliance validation engine
- State-specific rules engine (37 states)
- Automated testing suite (>80% coverage)
- API documentation
- User documentation

**State-Specific Features:**
- Transfer tax calculations by state
- Recording fee schedules
- State-specific documents
- Jurisdictional requirements

### Customer Onboarding
**Self-Service Tools:**
- Sign-up flow with organization creation
- Data import tools (CSV, Qualia export)
- Interactive tutorials
- Video training materials
- Support ticket system

## Phase 4: SaaS Launch (Months 7-9)
**Goal**: Launch to first paying customers

### Platform Features
**Billing & Subscription:**
- Stripe integration
- Subscription management
- Usage tracking
- Invoice generation
- Payment failure handling

**Customer Features:**
- Customer portal
- Advanced permissions matrix
- RESTful API for integrations
- Webhook system
- Mobile app (PWA)

### Go-to-Market Execution
**Launch Strategy:**
- 5 beta customers at $250/mo (50% discount)
- Weekly feedback sessions
- Rapid iteration on pain points
- Case studies development

**Growth Targets:**
- Month 7: 5 customers ($1,250 MRR)
- Month 8: 10 customers ($3,500 MRR)
- Month 9: 20 customers ($7,000 MRR)

## Phase 5: Scale (Months 10-12)
**Goal**: Growth and marketplace preparation

### Platform Features
**Advanced Capabilities:**
- White-label options for enterprise
- Bulk import/export tools
- Advanced analytics dashboard
- AI-powered QC checks
- Document version control

**Performance at Scale:**
- Database optimization
- Caching layer (Redis)
- CDN for static assets
- Background job processing
- Horizontal scaling ready

### Marketplace Foundation
**Third-Party Integration:**
- Partner API development
- Service provider directory
- Transaction routing engine
- Commission handling system
- Rating/review system

**Initial Partners:**
- Mobile notaries
- Title search providers
- Recording services
- Insurance providers

## Technical Architecture Evolution

### MVP Architecture (Month 1)
```
Frontend (React) → API (Express) → PostgreSQL
                → PDF Generator
                → Fee API
```

### Production Architecture (Month 3)
```
Frontend (React) → API (Express) → PostgreSQL
                → PDF Generator
                → Fee API
                → OCR Service
                → Email Service
                → Backup Service
```

### Scale Architecture (Month 12)
```
Frontend (React) → Load Balancer → API Cluster
                                 ↓
                    PostgreSQL (Primary/Replica)
                    Redis (Cache/Queue)
                    S3 (Documents)
                    External Services:
                    - OCR (AWS Textract)
                    - Fees API
                    - Email (SendGrid)
                    - SMS (Twilio)
                    - Marketplace APIs
```

## Budget Allocation ($10K)

### Year 1 Expense Breakdown

| Category | Monthly | Annual | Notes |
|----------|---------|--------|-------|
| **Infrastructure** | $200 | $2,400 | |
| - Hosting | $40 | $480 | Railway/Render |
| - Database | $40 | $480 | PostgreSQL managed |
| - Storage | $20 | $240 | S3 or equivalent |
| - CDN | $20 | $240 | CloudFlare |
| - Monitoring | $20 | $240 | Sentry |
| - Backups | $20 | $240 | Automated backups |
| - SSL | $40 | $480 | Wildcard cert |
| **Services** | $167 | $2,000 | |
| - OCR API | $50 | $600 | After month 3 |
| - Email | $20 | $240 | SendGrid |
| - SMS | $10 | $120 | Twilio |
| - Domain | $40 | $40 | Annual |
| - Other APIs | $87 | $1,000 | Various |
| **Tools** | | $1,000 | |
| - IDE licenses | | $200 | |
| - Testing tools | | $300 | |
| - Design tools | | $200 | |
| - Other software | | $300 | |
| **Legal/Compliance** | | $2,000 | |
| - Terms of Service | | $500 | |
| - Privacy Policy | | $500 | |
| - State filings | | $500 | |
| - Compliance review | | $500 | |
| **Marketing** | | $1,000 | |
| - Website | | $300 | |
| - Content | | $300 | |
| - Ads (minimal) | | $200 | |
| - Conferences | | $200 | |
| **Reserve** | | $1,600 | Emergency fund |
| **Total** | | $10,000 | |

## Success Metrics

### V1 Internal (Month 1)
- ✅ Complete 10 real transactions
- ✅ Zero critical calculation errors
- ✅ <5 second CD generation time
- ✅ 90% user satisfaction (internal team)

### V2 Market Ready (Month 6)
- ✅ 5 beta customers signed
- ✅ $1,250 MRR
- ✅ 99.9% uptime
- ✅ <2 sec page load times
- ✅ Zero compliance violations
- ✅ 50+ transactions processed

### V3 Growth (Month 12)
- ✅ 20 paying customers
- ✅ $10,000 MRR
- ✅ 500+ transactions/month
- ✅ 2 marketplace partners
- ✅ <1% error rate
- ✅ 4.5+ customer satisfaction

## Risk Analysis & Mitigation

### Technical Risks
| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Complex calculations wrong | Medium | High | Extensive testing, parallel run with Qualia |
| PDF generation issues | Low | Medium | Multiple PDF libraries as backup |
| Database performance | Low | High | JSONB indexes, query optimization |
| Integration failures | Medium | Medium | Retry logic, fallback systems |

### Market Risks
| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Slow adoption | High | High | Start with own company, prove value |
| Price pressure | Medium | Medium | Focus on value, not just price |
| Qualia responds | Low | High | Move fast, focus on differentiators |
| Competition emerges | Medium | Medium | Build moat through integrations |

### Regulatory Risks
| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| TRID compliance issues | Low | High | Legal review, follow specs exactly |
| State-specific violations | Medium | Medium | Gradual state rollout |
| Data breach | Low | Critical | Security-first design, insurance |
| Consumer complaints | Low | High | Excellent support, quick fixes |

## Development Priorities

### Week 1 Sprint (Current)
1. ✅ Create product roadmap
2. [ ] Setup PostgreSQL with JSONB schema
3. [ ] Create Sequelize models for orders
4. [ ] Build order CRUD API endpoints
5. [ ] Implement JWT authentication
6. [ ] Create React app structure
7. [ ] Deploy to Railway/Render

### Week 2 Sprint
1. [ ] Convert loan-terms.html to React component
2. [ ] Convert all charge sections (A,B,C,E,F,G,H) to React
3. [ ] Build calculation engine
4. [ ] Implement form validation
5. [ ] Create order creation flow
6. [ ] Add auto-save functionality

### Week 3 Sprint
1. [ ] Build CD PDF generator
2. [ ] Build HUD PDF generator
3. [ ] Create check PDF template
4. [ ] Implement ledger calculations
5. [ ] Add print functionality
6. [ ] Create transaction summary view

### Week 4 Sprint
1. [ ] Integrate fee API
2. [ ] Complete end-to-end testing
3. [ ] Fix critical bugs
4. [ ] Performance optimization
5. [ ] Deploy to production
6. [ ] Create user documentation

## Key Technical Decisions

### Immediate Decisions Needed
1. **Hosting Provider**
   - Option A: Railway.app ($20/mo, easier deployment)
   - Option B: Render.com ($20/mo, better scaling)
   - **Recommendation**: Railway for MVP, migrate later if needed

2. **PDF Generation Library**
   - Option A: react-pdf (faster, less accurate)
   - Option B: Puppeteer (perfect fidelity, slower)
   - **Recommendation**: Puppeteer for compliance accuracy

3. **State Management**
   - Option A: Zustand (simple, lightweight)
   - Option B: Redux Toolkit (complex but proven)
   - **Recommendation**: Zustand for MVP, refactor if needed

4. **UI Component Library**
   - Option A: Continue with pure Tailwind
   - Option B: Add Shadcn/ui for faster development
   - **Recommendation**: Shadcn/ui to accelerate development

5. **Database Choice**
   - Option A: Stick with MySQL
   - Option B: PostgreSQL for JSONB
   - **Recommendation**: PostgreSQL (critical for schema flexibility)

### Architecture Decisions
- **Monorepo**: Yes, keep frontend/backend together initially
- **API Style**: RESTful for MVP, consider GraphQL later
- **Authentication**: JWT with refresh tokens
- **File Storage**: Local for MVP, S3 for production
- **Caching**: None for MVP, Redis when scaling

## Communication & Reporting

### Weekly Updates
Every Friday, report on:
- Features completed
- Bugs fixed
- Blockers encountered
- Next week's priorities
- Budget status
- Customer feedback (when applicable)

### Monthly Reviews
First Monday of month:
- Progress against roadmap
- Metric performance
- Budget review
- Risk assessment
- Roadmap adjustments

## Success Factors

### Critical Success Factors
1. **Calculation Accuracy**: Must be 100% correct
2. **Compliance**: Must meet TRID requirements
3. **Performance**: Must be faster than Qualia
4. **Reliability**: 99.9% uptime after launch
5. **Usability**: Easier to use than Qualia

### Competitive Advantages
1. **Price**: 67% cheaper than Qualia
2. **Speed**: Faster load times and calculations
3. **Simplicity**: Cleaner, more intuitive UI
4. **Flexibility**: Better customization options
5. **Support**: Direct access to development team

## Next Steps

### Immediate Actions (This Week)
1. ✅ Finalize product roadmap
2. [ ] Set up development environment
3. [ ] Create PostgreSQL database
4. [ ] Build authentication system
5. [ ] Start API development
6. [ ] Begin React app structure

### Next Week Actions
1. [ ] Complete Week 1 deliverables
2. [ ] Start Week 2 sprint
3. [ ] Convert first HTML prototype
4. [ ] Build calculation engine foundation
5. [ ] Deploy to staging

## Appendix: Feature Comparison

### Garden vs Qualia Feature Matrix

| Feature | Qualia | Garden V1 | Garden V2 | Garden V3 |
|---------|--------|-----------|-----------|-----------|
| CD Generation | ✅ | ✅ | ✅ | ✅ |
| HUD Generation | ✅ | ✅ | ✅ | ✅ |
| Check Printing | ✅ | ✅ | ✅ | ✅ |
| Ledger/Accounting | ✅ | ✅ | ✅ | ✅ |
| OCR Import | ✅ | Nice | ✅ | ✅ |
| Multi-tenant | ✅ | ❌ | ✅ | ✅ |
| Mobile App | ✅ | ❌ | PWA | Native |
| Marketplace | Limited | ❌ | ❌ | ✅ |
| AI Features | Basic | ❌ | ❌ | ✅ |
| White Label | ✅ | ❌ | ❌ | ✅ |
| API Access | Limited | ❌ | ✅ | ✅ |
| Price/month | $1500 | Internal | $500 | $500+ |

## Contact & Resources

### Team
- Product Owner: [Your Name]
- Lead Developer: Claude + You
- Supporting Developer: [Other Developer]

### Resources
- GitHub Repo: /Users/macbook/Documents/GitHub/garden
- Schema Docs: schema/SCHEMA-GUIDE.md
- UCD Mapping: schema/ucd-qualia-mapping.csv
- HTML Prototypes: html-prototypes/

### Key Files
- Business Plan: schema/Biz plan
- Product Roadmap: PRODUCT-ROADMAP.md (this file)
- Development Guide: CLAUDE.md
- Schema Guide: schema/SCHEMA-GUIDE.md

---

*Last Updated: 2025-01-12*
*Version: 1.0*
*Status: Active Development - Week 1*