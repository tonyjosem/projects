# Setup and Operations Guide

This guide covers:

- Local setup from scratch.
- MySQL database and role setup.
- Running with Python + uv.
- Backup and restore.
- Fast setup on a new server using a backup.

## 1. Prerequisites

- Python 3.11+
- [uv](https://docs.astral.sh/uv/)
- MySQL Server 8+

## 2. Project Setup (Simple Steps)

From the project root:

```bash
uv sync
cp .env.example .env
```

Edit `.env` and update:

- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `SECRET_KEY`

## 3. Set Up Database, Roles, and Credentials

Run SQL script as an admin user (e.g., root):

```bash
mysql -u root -p < db/create_db_and_user.sql
```

What it does:

- Creates database: `fund_tracker`
- Creates app user: `fund_app`
- Grants table-level privileges required by the application

If you want a different username/password:

1. Update values in `db/create_db_and_user.sql`.
2. Re-run script (or manually create user).
3. Use same values in `.env`.

## 4. Initialize Schema and Run App

Create tables:

```bash
uv run flask --app run.py init-db
```

Run application:

```bash
uv run python run.py
```

Dashboard URL:

```text
http://127.0.0.1:5000
```

## 5. Usage Flow

1. Click `+` add icon on dashboard.
2. Add fund name.
3. Open the fund tile.
4. Add data rows with:
   - Date
   - Principal
   - Current Value
   - Gains
   - Gains %
5. Click `Export Excel Dashboard` to download the fund workbook.

## 6. Backup Database

Option A - Script:

```bash
chmod +x db/backup_db.sh
DB_PASSWORD='your-password' ./db/backup_db.sh
```

Option B - Manual command:

```bash
mysqldump -h 127.0.0.1 -P 3306 -u fund_app -p \
  --single-transaction --routines --triggers fund_tracker > fund_tracker_backup.sql
```

## 7. Restore Database

Option A - Script:

```bash
chmod +x db/restore_db.sh
DB_PASSWORD='your-password' ./db/restore_db.sh ./backups/fund_tracker_YYYYMMDD_HHMMSS.sql
```

Option B - Manual command:

```bash
mysql -h 127.0.0.1 -P 3306 -u fund_app -p fund_tracker < fund_tracker_backup.sql
```

## 8. Quick Setup on a New Server from Scratch

## 8.1 Install System Dependencies

- Install Python 3.11+
- Install uv
- Install MySQL Server

## 8.2 Deploy Code

```bash
git clone <your-repo-url>
cd fund-tracker
uv sync
cp .env.example .env
```

## 8.3 Prepare Database/User

```bash
mysql -u root -p < db/create_db_and_user.sql
```

Update `.env` with the final DB password and host details.

## 8.4 Restore Existing Data (if migrating)

Copy backup file to server, then:

```bash
DB_PASSWORD='your-password' ./db/restore_db.sh /path/to/backup.sql
```

## 8.5 Start Application

```bash
uv run flask --app run.py init-db
uv run python run.py
```

Note: `init-db` is safe to run; it creates missing tables.

## 9. Security Notes

- Do not use default example passwords in production.
- Restrict DB user host scope where possible.
- Store `.env` securely and exclude it from version control.
- Rotate credentials periodically.
