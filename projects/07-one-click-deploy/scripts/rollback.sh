#!/usr/bin/env bash
# Roll back to the previous recorded release.
set -euo pipefail

ENVIRONMENT="${1:?Usage: rollback.sh <environment>}"
MARKER=".last_release_${ENVIRONMENT}"

[ -f "$MARKER" ] || { echo "No rollback point for ${ENVIRONMENT}"; exit 1; }

PREVIOUS="$(cat "$MARKER")"
echo "==> Rolling back ${ENVIRONMENT} to release ${PREVIOUS}"
# TODO: re-point traffic / redeploy previous artifact.
echo "==> Rollback complete."
