# Multi-Tenant SaaS Platform

Row-level security, tenant isolation, per-tenant analytics, and usage-based billing.

**Shows:** You understand enterprise deployment constraints.

## Core ideas
- **Tenant isolation** via a `tenant_id` on every row + Postgres Row-Level Security (RLS).
- **Per-tenant analytics** aggregated from a metered event stream.
- **Usage-based billing** derived from recorded events.

## Structure
```
src/
  tenantContext.ts   # resolves the current tenant per request
  rls.sql            # Postgres row-level security policy
  server.ts          # minimal Express API scoped by tenant
```

## Run
```bash
npm install
npm run dev
```

## Roadmap
- [ ] JWT-based tenant resolution
- [ ] RLS enforced at the DB connection level
- [ ] Per-tenant usage rollups
- [ ] Stripe metered billing hook
