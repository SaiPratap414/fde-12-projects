# Customer Health Dashboard

Real-time usage metrics, adoption tracking, SLA monitoring, and alerting on breaches.

**Shows:** You think about customer success, not just code.

## Core ideas
- **Health score** per customer from usage + adoption signals.
- **SLA monitoring** with breach detection.
- **Alerting** when a customer's health drops or an SLA breaches.

## Structure
```
src/
  healthScore.ts   # compute a 0-100 customer health score
  sla.ts           # SLA breach detection
```

## Roadmap
- [ ] Ingest usage metrics
- [ ] Weighted health score
- [ ] SLA thresholds + breach detection
- [ ] Alert routing (email/Slack)
