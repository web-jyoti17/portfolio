# Docker Development Guide

This guide details how to build, run, and manage this project using the custom **Docker Compose** configuration.

---

## 🌐 URLs & Access Details

| Service | Local URL | Port |
| :--- | :--- | :--- |
| **Website (Laravel App)** | [http://localhost:5555](http://localhost:5555) | `5555` |
| **Filament Admin Panel** | [http://localhost:5555/admin](http://localhost:5555/admin) | `5555` |
| **phpMyAdmin** | [http://localhost:8081](http://localhost:8081) | `8081` |

> [!WARNING]
> **phpMyAdmin Port Notice**: We originally attempted to run phpMyAdmin on port `6666`. However, port `6666` is blocked by default by modern web browsers (Chrome, Safari, Firefox, Edge) as an unsafe/restricted port due to security vulnerabilities (like NAT Slipstreaming). Therefore, phpMyAdmin has been mapped to port **`8081`**.

### Admin Panel Credentials
- **Email:** `admin@example.com`
- **Password:** `password`

---

## 📁 Project Structure

```
Portfolio/
├── src/                     # the Laravel application (mounted at /var/www in the containers)
├── docker/nginx/default.conf
├── Dockerfile               # PHP-FPM image
├── compose.yaml             # app, nginx, MySQL, phpMyAdmin
├── run.sh                   # helper wrapper around docker compose
└── scripts/                 # Google Drive backup scripts
```

The Laravel `.env` lives at `src/.env`. Compose reads ports and database credentials from it, so pass it with `--env-file src/.env` (`run.sh` does this for you), or link it once from the project root:

```bash
cp src/.env.example src/.env
ln -s src/.env .env
```

---

## 🚀 Quick Start Commands

You can interact with your Docker stack using standard `docker compose` commands:

### 1. Build and Start the Project
To build the Docker images and spin up the containers in the background:
```bash
docker compose build
docker compose up -d
```

### 2. Install Dependencies & Build Frontend (Vite)
Run the one-shot frontend compilation container to install Node modules and build Vite assets:
```bash
docker compose --profile setup run --rm frontend-build
```

### 3. Run Migrations & Seed Database
Reset the database, run all migrations, and seed dynamic developer portfolio mock data:
```bash
docker compose exec app php artisan migrate:fresh --seed
```

---

## 🛠️ Docker Compose Command Reference

| Action | Command |
| :--- | :--- |
| **Start containers** | `docker compose up -d` |
| **Stop containers** | `docker compose down` |
| **Stop & delete volumes** | `docker compose down -v` |
| **Restart containers** | `docker compose restart` |
| **Check logs** | `docker compose logs -f` |
| **Check container status** | `docker compose ps` |
| **Enter Application Shell** | `docker compose exec app bash` |
| **Laravel Tinker** | `docker compose exec app php artisan tinker` |
| **Run PHPUnit Tests** | `docker compose exec app php artisan test` |
| **Run Composer command** | `docker compose exec app composer [command]` |

---

## 🧹 Helper Script (`run.sh`)

We also provide a wrapper script `./run.sh` to make command execution even simpler:

- **Start:** `./run.sh start`
- **Stop:** `./run.sh stop`
- **Build:** `./run.sh build`
- **Frontend Build:** `./run.sh frontend-build`
- **Migrate & Seed:** `./run.sh migrate-seed`
- **SSH Shell:** `./run.sh shell`
- **Tinker:** `./run.sh tinker`

## Backups to Google Drive

`scripts/backup-to-drive.sh` saves three files to `My Drive/Portfolio Backups` (it keeps the newest 30 of each):

| File | Contains | Restore with |
| --- | --- | --- |
| `blog-*.json` | every blog post, its cover and the images inside the article | Admin → Blog Posts → Import, or `docker exec laravel-app php artisan blog:import <file>` |
| `site-*.zip` | all portfolio content and uploaded files (no admin users) | Admin → Import / Export → Import a site export, or `docker exec laravel-app php artisan site:import <file>` |
| `database-*.sql.gz` | the full MySQL database, including admin users | `gunzip -c database-....sql.gz \| docker exec -i laravel-db sh -c 'mysql -uroot -p"$MYSQL_ROOT_PASSWORD"'` |

Setup, once:

1. Install [Google Drive for desktop](https://www.google.com/drive/download/) and sign in.
2. Run `scripts/backup-to-drive.sh` to make the first backup and check it appears in Drive.
3. Run `scripts/install-drive-backup.sh` to back up every day at 02:00 (log: `~/Library/Logs/portfolio-drive-backup.log`). `scripts/install-drive-backup.sh uninstall` removes it.

To save somewhere else, set `BACKUP_DIR=/path/to/folder` when running the script.

The database dump restores everything as it was, so only use it on a fresh install or to roll back. The blog and site files merge into an existing install.
