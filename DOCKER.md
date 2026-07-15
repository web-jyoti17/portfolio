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
