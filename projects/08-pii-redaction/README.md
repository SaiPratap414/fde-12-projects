# PII Redaction Middleware

Detect and mask sensitive data before processing, with compliance logging (SOC 2, GDPR).

**Shows:** You understand data privacy in production.

## Core ideas
- **Detection** of emails, phones, SSNs, credit cards, etc.
- **Masking** before data reaches downstream systems/LLMs.
- **Compliance logging** of what was redacted (without storing the raw PII).

## Structure
```
src/
  redact.py    # detect + mask PII
  compliance.py# redaction audit log (counts, not raw values)
```

## Run
```bash
python src/redact.py "Email me at jane@example.com or 555-123-4567"
```
