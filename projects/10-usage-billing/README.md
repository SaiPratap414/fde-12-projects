# Usage Metering and Billing

Track API calls per tenant, meter features, and integrate Stripe usage-based billing.

**Shows:** You connect engineering to revenue.

## Core ideas
- **Metering** — count billable events per tenant/feature.
- **Aggregation** — roll up usage into billing periods.
- **Stripe** — report metered usage to Stripe subscription items.

## Structure
```
src/
  meter.ts    # record + aggregate usage events
  stripe.ts   # report usage to Stripe (stub)
```

## Roadmap
- [ ] Event ingestion
- [ ] Per-tenant aggregation
- [ ] Stripe usage records
- [ ] Invoicing reconciliation
