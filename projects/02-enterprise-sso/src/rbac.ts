// Minimal role-based access control model.
export type Role = 'owner' | 'admin' | 'member' | 'viewer';
export type Permission = 'read' | 'write' | 'admin' | 'billing';

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  owner: ['read', 'write', 'admin', 'billing'],
  admin: ['read', 'write', 'admin'],
  member: ['read', 'write'],
  viewer: ['read']
};

export function can(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}
