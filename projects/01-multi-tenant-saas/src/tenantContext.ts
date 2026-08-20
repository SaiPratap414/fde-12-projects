// Resolves the current tenant for a request and binds it for the DB session.
export interface TenantContext {
  tenantId: string;
  plan: 'free' | 'pro' | 'enterprise';
}

// Placeholder: derive tenant from a verified JWT claim in production.
export function resolveTenant(headers: Record<string, string | undefined>): TenantContext {
  const tenantId = headers['x-tenant-id'];
  if (!tenantId) throw new Error('Missing tenant context');
  return { tenantId, plan: 'free' };
}
