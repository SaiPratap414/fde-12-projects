# Enterprise SSO Integration

OAuth2, SAML, SCIM provisioning, and role-based access control across tenants.

**Shows:** You can pass enterprise security reviews.

## Core ideas
- **OAuth2 / OIDC** login for standard IdPs.
- **SAML 2.0** for enterprise IdPs (Okta, Azure AD, Ping).
- **SCIM 2.0** for automated user/group provisioning + deprovisioning.
- **RBAC** mapping IdP groups → app roles per tenant.

## Structure
```
src/
  rbac.ts        # role definitions + permission checks
  scim.ts        # SCIM user provisioning stubs
```

## Roadmap
- [ ] OIDC auth code flow with PKCE
- [ ] SAML assertion validation
- [ ] SCIM create/update/deactivate
- [ ] Group-to-role mapping per tenant
