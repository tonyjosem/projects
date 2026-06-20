# Fund Tracker Pro

Professional fund tracker built with Python, uv, Flask, and MySQL.

## Features

- Apple glass-style dashboard UI.
- Separate tiles for each fund.
- Add new funds from a floating add icon.
- Click a fund tile to open details.
- Add fund data points with:
  - Date
  - Principal
  - Current Value
  - Gains
  - Gains %
- Interactive performance chart for each fund.
- Export fund-level Excel dashboard.
- MySQL-backed persistent storage.

## Quick Start

1. Install dependencies using uv:

```bash
uv sync
```

2. Create environment file:

```bash
cp .env.example .env
```

3. Prepare MySQL database and app user:

```bash
mysql -u root -p Bug1$nest < db/create_db_and_user.sql
```

4. Update `.env` with your DB credentials.

5. Initialize database tables:

```bash
uv run flask --app run.py init-db
```

6. Run the app:

```bash
uv run python run.py
```

Open: http://127.0.0.1:5000

## Full Setup and Operations Guide

See [docs/SETUP_AND_OPERATIONS.md](docs/SETUP_AND_OPERATIONS.md).
