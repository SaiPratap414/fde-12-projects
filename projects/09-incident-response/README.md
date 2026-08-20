# Incident Response System

Structured logging, distributed tracing, post-mortem templates, and customer comms playbooks.

**Shows:** You can own production when things break.

## Core ideas
- **Structured logs** with a trace/correlation id across services.
- **Post-mortem template** for blameless retros.
- **Comms playbook** for customer-facing incident updates.

## Structure
```
src/
  logger.ts              # structured JSON logger with correlation id
templates/
  postmortem.md          # blameless post-mortem template
  customer-comms.md      # incident communication playbook
```
