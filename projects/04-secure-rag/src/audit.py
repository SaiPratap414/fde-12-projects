"""Append-only audit log for every RAG query."""
import json
import time
from pathlib import Path

AUDIT_FILE = Path("audit.log.jsonl")


def record(user_id: str, query: str, source_doc_ids: list[str]) -> None:
    entry = {
        "ts": time.time(),
        "user_id": user_id,
        "query": query,
        "sources": source_doc_ids,
    }
    with AUDIT_FILE.open("a", encoding="utf-8") as f:
        f.write(json.dumps(entry) + "\n")
