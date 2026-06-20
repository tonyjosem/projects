#!/usr/bin/env bash
set -euo pipefail

DB_HOST="${DB_HOST:-127.0.0.1}"
DB_PORT="${DB_PORT:-3306}"
DB_NAME="${DB_NAME:-fund_tracker}"
DB_USER="${DB_USER:-fund_app}"
BACKUP_DIR="${BACKUP_DIR:-./backups}"

mkdir -p "$BACKUP_DIR"
STAMP="$(date +%Y%m%d_%H%M%S)"
OUT_FILE="$BACKUP_DIR/${DB_NAME}_${STAMP}.sql"

if [[ -z "${DB_PASSWORD:-}" ]]; then
  read -rsp "Enter MySQL password for $DB_USER: " DB_PASSWORD
  echo
fi

mysqldump -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" \
  --single-transaction --routines --triggers "$DB_NAME" > "$OUT_FILE"

echo "Backup created: $OUT_FILE"
