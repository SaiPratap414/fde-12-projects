# Secure Customer RAG System

Document ingestion with permission filtering, citation tracking, and audit logs.

**Shows:** You can deploy AI on sensitive customer data safely.

## Core ideas
- **Permission-filtered retrieval** — users only retrieve chunks they're allowed to see.
- **Citation tracking** — every answer maps back to source documents.
- **Audit logs** — every query + retrieved sources are recorded.

## Structure
```
src/
  ingest.py     # chunk + embed documents with ACL metadata
  retrieve.py   # permission-filtered retrieval + citations
  audit.py      # append-only audit log
```

## Run
```bash
python -m venv .venv && . .venv/bin/activate
pip install -r requirements.txt
```

## Roadmap
- [ ] Chunking + embeddings
- [ ] ACL metadata on every chunk
- [ ] Permission-filtered vector search
- [ ] Citation + audit trail on every answer
