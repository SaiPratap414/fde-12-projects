"""Compliance logging: record WHAT type of PII was redacted, never the raw value."""
import json
import time
from pathlib import Path

LOG = Path("compliance.log.jsonl")


def log_redaction(request_id: str, counts: dict[str, int]) -> None:
    entry = {"ts": time.time(), "request_id": request_id, "redactions": counts}
    with LOG.open("a", encoding="utf-8") as f:
        f.write(json.dumps(entry) + "\n")
