# FDE 12 — Daily Auto-Publisher

A control repo that holds **12 Forward Deployed Engineer (FDE) project scaffolds** and an
automation engine that **publishes one project per day** into its own dedicated GitHub repo
under [`saipratap414`](https://github.com/saipratap414).

## How it works

1. All 12 project scaffolds live in [`projects/`](projects/).
2. [`schedule/manifest.json`](schedule/manifest.json) is the ordered plan (title → target repo).
3. [`schedule/state.json`](schedule/state.json) tracks which project is next.
4. A daily GitHub Action ([`.github/workflows/daily-publish.yml`](.github/workflows/daily-publish.yml))
   runs [`scripts/publish-next.mjs`](scripts/publish-next.mjs), which:
   - creates the target repo (if it doesn't exist),
   - pushes that project folder as the repo's initial `main`,
   - advances `state.json` and commits it back here.

After 12 days, all projects are published and the job becomes a no-op.

## One-time setup

1. **Create this control repo and push it:**
   ```powershell
   git init
   git add .
   git commit -m "Initial: FDE 12 auto-publisher"
   git branch -M main
   git remote add origin https://github.com/saipratap414/fde-12-projects.git
   git push -u origin main
   ```
   (Create the empty `fde-12-projects` repo on GitHub first.)

2. **Add a Personal Access Token secret** so the Action can create repos:
   - GitHub → Settings → Developer settings → **Personal access tokens**.
   - Classic token with `repo` scope **or** a fine-grained token with
     *Administration: read/write* + *Contents: read/write* on your account.
   - In the `fde-12-projects` repo: **Settings → Secrets and variables → Actions → New repository secret**
     - Name: `GH_PAT`
     - Value: *(your token)*

3. Done. The Action runs daily at **03:00 UTC**. You can also trigger it manually from the
   **Actions** tab → *Daily FDE Project Publish* → **Run workflow**.

## Run it locally (optional)

```powershell
$env:GH_PAT="<your-token>"; node scripts/publish-next.mjs          # publish next project now
node scripts/publish-next.mjs --dry-run                            # preview without pushing
```

## The 12 projects

| # | Project | Target repo | Stack |
|---|---------|-------------|-------|
| 1 | Multi-Tenant SaaS Platform | `fde-multi-tenant-saas` | Node/TS |
| 2 | Enterprise SSO Integration | `fde-enterprise-sso` | Node/TS |
| 3 | Customer Connector Pack | `fde-connector-pack` | Node/TS |
| 4 | Secure Customer RAG System | `fde-secure-rag` | Python |
| 5 | Customer Health Dashboard | `fde-health-dashboard` | Node/TS |
| 6 | Webhook Integration Engine | `fde-webhook-engine` | Node/TS |
| 7 | One-Click Customer Deployment | `fde-one-click-deploy` | Bash/IaC |
| 8 | PII Redaction Middleware | `fde-pii-redaction` | Python |
| 9 | Incident Response System | `fde-incident-response` | Node/TS |
| 10 | Usage Metering and Billing | `fde-usage-billing` | Node/TS |
| 11 | Customer Onboarding Automation | `fde-onboarding-automation` | Node/TS |
| 12 | Public Deployment Case Study | `fde-deployment-case-study` | Docs |
