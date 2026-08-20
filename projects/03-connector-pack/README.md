# Customer Connector Pack

Pre-built integrations for Salesforce, Slack, HubSpot, and Google Workspace with error recovery.

**Shows:** You can plug into any customer tech stack.

## Core ideas
- A common **Connector interface** so every integration behaves the same.
- Built-in **error recovery** (retry, backoff, circuit breaking) per connector.
- Normalized auth handling (OAuth tokens, API keys).

## Structure
```
src/
  connector.ts      # shared Connector interface
  slack.ts          # example connector implementation
```

## Roadmap
- [ ] Salesforce connector
- [ ] Slack connector
- [ ] HubSpot connector
- [ ] Google Workspace connector
