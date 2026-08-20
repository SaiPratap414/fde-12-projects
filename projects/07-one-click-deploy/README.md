# One-Click Customer Deployment

Automated provisioning scripts, environment configs, and rollback mechanisms.

**Shows:** You can deploy to customer environments fast and safely.

## Core ideas
- **One command** provisions a full environment.
- **Environment configs** are declarative and versioned.
- **Rollback** restores the previous known-good release.

## Structure
```
scripts/
  deploy.sh     # provision + deploy
  rollback.sh   # revert to previous release
config/
  env.example   # declarative environment config
```

## Usage
```bash
./scripts/deploy.sh staging
./scripts/rollback.sh staging
```
