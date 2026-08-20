# Webhook Integration Engine

Signature verification, retry logic with backoff, dead-letter queues, and idempotency.

**Shows:** You can build reliable event-driven integrations.

## Core ideas
- **Signature verification** (HMAC) to reject forged webhooks.
- **Idempotency** so duplicate deliveries are processed once.
- **Retries with backoff** + a **dead-letter queue** for poison events.

## Structure
```
src/
  verify.ts        # HMAC signature verification
  idempotency.ts   # dedupe by delivery id
```

## Roadmap
- [ ] HMAC verification middleware
- [ ] Idempotency store
- [ ] Retry queue with backoff
- [ ] Dead-letter queue + replay
