#!/usr/bin/env bash
# One-click deploy: provision + release with a recorded rollback point.
set -euo pipefail

ENVIRONMENT="${1:?Usage: deploy.sh <environment>}"
RELEASE="$(date +%Y%m%d%H%M%S)"

echo "==> Deploying to ${ENVIRONMENT} (release ${RELEASE})"

# 1. Load environment config
CONFIG="config/${ENVIRONMENT}.env"
[ -f "$CONFIG" ] || { echo "Missing config: $CONFIG"; exit 1; }

# 2. Record current release as rollback point
echo "$RELEASE" > ".last_release_${ENVIRONMENT}"

# 3. Provision + release (placeholders)
echo "==> Provisioning infrastructure..."
echo "==> Releasing application..."

echo "==> Deploy ${RELEASE} complete."
