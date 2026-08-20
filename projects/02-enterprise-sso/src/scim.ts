// SCIM 2.0 user provisioning stubs (RFC 7644).
export interface ScimUser {
  id: string;
  userName: string;
  active: boolean;
  groups: string[];
}

export async function provisionUser(user: Omit<ScimUser, 'id'>): Promise<ScimUser> {
  // TODO: persist and map groups -> roles per tenant.
  return { id: crypto.randomUUID(), ...user };
}

export async function deactivateUser(id: string): Promise<void> {
  // TODO: mark inactive, revoke sessions/tokens.
  void id;
}
