#!/usr/bin/env bash
# Install a crontab entry to run nginx-log-summary daily at 23:55, saving to ./logs.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HOME_DIR="${HOME}"
SUMMARY_BIN="${HOME_DIR}/nginx-log-summary.sh"
LOG_DIR="${HOME_DIR}/logs"

if [[ ! -x "${SUMMARY_BIN}" ]]; then
  echo "Summary script not executable: ${SUMMARY_BIN}" >&2
  exit 1
fi

mkdir -p "${LOG_DIR}"

# Cron line (note: % must be escaped as \% inside crontab).
CRON_CMD="cd ${HOME_DIR} && ${SUMMARY_BIN} /var/log/nginx/access.log > ${LOG_DIR}/access-summary-\$(date +\\%Y\\%m\\%d-\\%H\\%M\\%S).txt"
CRON_LINE="55 23 * * * ${CRON_CMD}"

TMP_CRON="$(mktemp)"
trap 'rm -f "${TMP_CRON}"' EXIT

crontab -l 2>/dev/null | grep -v "${SUMMARY_BIN}" > "${TMP_CRON}" || true
echo "${CRON_LINE}" >> "${TMP_CRON}"
crontab "${TMP_CRON}"

echo "Cron installed:"
echo "${CRON_LINE}"
echo "Logs will be saved under: ${LOG_DIR}"
