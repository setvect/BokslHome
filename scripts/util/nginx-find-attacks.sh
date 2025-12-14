#!/usr/bin/env bash
# Filter nginx access log for likely attack probes.

set -euo pipefail

LOG_FILE="${1:-/var/log/nginx/access.log}"
IP_FILTER="${2:-}" # optional: filter by specific IP

if [[ ! -f "${LOG_FILE}" ]]; then
  echo "Log file not found: ${LOG_FILE}" >&2
  exit 1
fi

# Common probe signatures
PATTERN=$(cat <<'EOF'
\.env
phpinfo
wp-login\.php
wp-admin
\.git
\.svn
\.DS_Store
composer\.(json|lock)
package\.json
\.ssh
\.bash_history
\.htaccess
\.well-known/.*(acme|security)
/config/
/admin/
/backend/
/vendor/
/app_dev\.php
\.idea
EOF
)

if [[ -n "${IP_FILTER}" ]]; then
  grep -F "${IP_FILTER}" "${LOG_FILE}" | grep -E -i "${PATTERN}"
else
  grep -E -i "${PATTERN}" "${LOG_FILE}"
fi
