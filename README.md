# BACKINGHUM

> **Website & Docs:** [backinghum.vercel.app](https://backinghum.vercel.app)
> **npm:** [npmjs.com/package/backinghum](https://www.npmjs.com/package/backinghum) · `v1.0.6`

A Node.js command-line tool to create, list, restore, and delete database backups for MongoDB, MySQL, and PostgreSQL. Interactive prompts guide you through every step — no config files required.

```bash
npm install -g backinghum
```

---

## Website

The project has a live website deployed on Vercel:

**[https://backinghum.vercel.app](https://backinghum.vercel.app)**

- Landing page with install instructions
- Full documentation at [backinghum.vercel.app/docs](https://backinghum.vercel.app/docs)

The frontend lives in the `frontend/` directory and is built with React + Vite + Tailwind CSS v4.

---

## Install from npm

```bash
npm install -g backinghum
```

Verify installation:

```bash
backinghum --version
```

---

## Documentation

Full documentation is available at **[backinghum.vercel.app/docs](https://backinghum.vercel.app/docs)**.

Raw markdown docs are also available in this repo:

- [docs/INSTALLATION.md](docs/INSTALLATION.md)
- [docs/COMMANDS.md](docs/COMMANDS.md)
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

---

## Features

- Unified CLI interface for backup lifecycle operations.
- Interactive prompts for database-specific connection details.
- Adapter architecture (`BaseAdapter` + per-database adapters) for extensibility.
- Backup creation for:
  - MongoDB (`mongodump`)
  - MySQL (`mysqldump`)
  - PostgreSQL (`pg_dump`)
  - PostgreSQL in Docker (`docker exec ... pg_dump`)
- Optional backup compression:
  - MySQL/PostgreSQL: `.sql.gz`
  - MongoDB: `.tar.gz` archive of dump folder
- Backup listing from registry.
- Backup restore by backup ID (merge or replace mode).
- Backup deletion by backup ID (file/folder + registry entry).
- Registry persistence in `$HOME/.db_backup/backupRegistry.json`.
- Connection snapshot saved with each backup entry to support restore runs.

---

## Quick start

```bash
# 1. Create a compressed backup
backinghum backup:create --compress --verbose

# 2. List all backups
backinghum backup:list

# 3. Restore by ID
backinghum backup:restore 1776174984348

# 4. Delete when no longer needed
backinghum backup:delete 1776174984348
```

---

## Commands

| Command | Description |
|---|---|
| `backup:create` | Interactive wizard to create a new backup |
| `backup:list` | List all backups from the registry |
| `backup:restore <id>` | Restore a backup by ID |
| `backup:delete <id>` | Delete a backup by ID |

Options for `backup:create`:

| Flag | Description |
|---|---|
| `-c, --compress` | Compress the backup output |
| `-v, --verbose` | Print detailed process logs |

---

## Prerequisites

Install Node.js LTS, then install the native database tools for the databases you plan to use.

| Database | Required tools |
|---|---|
| MongoDB | `mongosh`, `mongodump`, `mongorestore`, `tar` |
| MySQL | `mysql`, `mysqldump`, `gzip`, `gunzip` |
| PostgreSQL | `psql`, `pg_dump`, `gzip`, `gunzip` |
| PostgreSQL (Docker) | `docker` (container must have pg client tools) |

---

## Installation

### End users

```bash
npm install -g backinghum
```

### Contributors / local development

```bash
git clone https://github.com/AtharvaKatiyar/backinghum.git
cd backinghum
npm install

# Run directly
node bin/cli.js --help

# Or link globally
npm link
```

---

## Project structure

```
backinghum/
├── bin/cli.js                  # CLI entrypoint
├── src/
│   ├── adapters/               # DB adapters (mongo, mysql, postgres)
│   ├── commands/backup/        # Command handlers (create, list, restore, delete)
│   ├── prompts/                # Interactive prompt flows per database
│   ├── registry/registry.js    # Registry read/write helpers
│   └── utils/                  # Errors, normalize, validate, sanitize
├── docs/                       # Markdown documentation
├── frontend/                   # React + Vite website (deployed to Vercel)
└── tests/                      # Test suite
```

---

## Registry format

Each backup entry contains:

```json
{
  "id": "1776174984348",
  "db": "postgres",
  "database": "myapp",
  "path": "/home/user/backups/myapp_2025-01-10.sql.gz",
  "compressed": true,
  "size": 204800,
  "createdAt": "2025-01-10T14:32:00.000Z",
  "connection": { "host": "127.0.0.1", "port": "5432", "user": "postgres", "..." : "..." }
}
```

> The `connection` object stores credentials in plaintext. The registry file is created with mode `0600` and the directory with `0700`. Treat it as sensitive.

Registry path can be overridden with `DB_BACKUP_REGISTRY_PATH` — must be inside the current user's home directory.

---

## Security

- `prepublishOnly` enforces `npm test` + `npm run audit` before publishing.
- Package `files` allowlist prevents accidental file leakage on publish.
- Unused dependencies removed to reduce supply-chain risk.
- Registry path override restricted to paths inside the user's home directory.

---

## Tech stack

| Layer | Technology |
|---|---|
| CLI parsing | Commander |
| Interactive prompts | Inquirer |
| DB tool invocation | Native `child_process` |
| Backup metadata | JSON file registry |
| Website | React, Vite, Tailwind CSS v4 |
| Hosting | Vercel |

---

## License

ISC
