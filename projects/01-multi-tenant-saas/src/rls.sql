-- Row-Level Security: each tenant sees only its own rows.
-- Set `app.current_tenant` per connection/session before querying.

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON documents
  USING (tenant_id = current_setting('app.current_tenant')::uuid);

-- Usage example (per request):
--   SET app.current_tenant = '00000000-0000-0000-0000-000000000001';
--   SELECT * FROM documents; -- returns only this tenant's rows
