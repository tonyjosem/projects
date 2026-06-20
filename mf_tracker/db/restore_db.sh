#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: ./db/restore_db.sh <backup-file.sql>"
  exit 1
fi

BACKUP_FILE="$1"
DB_HOST="${DB_HOST:-127.0.0.1}"
DB_PORT="${DB_PORT:-3306}"
DB_NAME="${DB_NAME:-fund_tracker}"
DB_USER="${DB_USER:-fund_app}"

if [[ ! -f "$BACKUP_FILE" ]]; then
  echo "Backup file not found: $BACKUP_FILE"
  exit 1
fi

if [[ -z "${DB_PASSWORD:-}" ]]; then
  read -rsp "Enter MySQL password for $DB_USER: " DB_PASSWORD
  echo
fi

mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" < "$BACKUP_FILE"

echo "Restore completed from: $BACKUP_FILE"
