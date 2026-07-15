#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -e

# Define color outputs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Determine the absolute directory path of this script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

# Print helper usage
show_help() {
    echo -e "${BLUE}Custom Docker Compose Helper Script${NC}"
    echo -e "Usage: ./run.sh [command]"
    echo ""
    echo "Commands:"
    echo "  start / up          Start all Docker containers in background"
    echo "  stop / down         Stop all Docker containers"
    echo "  restart             Restart all Docker containers"
    echo "  build               Rebuild Docker containers"
    echo "  frontend-build      Run the frontend Inertia/Vite build container"
    echo "  migrate             Run database migrations"
    echo "  migrate-fresh       Reset database and run all migrations"
    echo "  seed                Seed database with dynamic data"
    echo "  migrate-seed        Reset database, run migrations, and seed"
    echo "  tinker              Open Laravel Tinker session"
    echo "  shell / bash        SSH into the main Laravel application container"
    echo "  test                Run application tests"
    echo "  logs                Show container logs (use Ctrl+C to exit)"
    echo "  composer [cmd]      Run Composer command inside application container"
    echo "  help                Show this help screen"
}

# Verify docker is running
check_docker() {
    if ! docker info >/dev/null 2>&1; then
        echo -e "${RED}Error: Docker is not running. Please start Docker Desktop first.${NC}"
        exit 1
    fi
}

# Handle command arguments
case "$1" in
    start|up|u)
        check_docker
        echo -e "${BLUE}Starting Docker containers...${NC}"
        docker compose up -d
        echo -e "${GREEN}Containers started!${NC}"
        echo -e "Website:      ${YELLOW}http://localhost:5555${NC}"
        echo -e "phpMyAdmin:   ${YELLOW}http://localhost:6666${NC}"
        ;;
    stop|down|d)
        check_docker
        echo -e "${BLUE}Stopping Docker containers...${NC}"
        docker compose down
        echo -e "${GREEN}Containers stopped.${NC}"
        ;;
    restart|r)
        check_docker
        echo -e "${BLUE}Restarting Docker containers...${NC}"
        docker compose restart
        ;;
    build|b)
        check_docker
        echo -e "${BLUE}Rebuilding Docker containers...${NC}"
        docker compose build
        ;;
    frontend-build)
        check_docker
        echo -e "${BLUE}Running frontend compilation container...${NC}"
        docker compose --profile setup run --rm frontend-build
        ;;
    migrate|m)
        check_docker
        echo -e "${BLUE}Running migrations...${NC}"
        docker compose exec app php artisan migrate
        ;;
    migrate-fresh)
        check_docker
        echo -e "${BLUE}Running fresh migrations...${NC}"
        docker compose exec app php artisan migrate:fresh
        ;;
    seed|s)
        check_docker
        echo -e "${BLUE}Seeding database...${NC}"
        docker compose exec app php artisan db:seed
        ;;
    migrate-seed)
        check_docker
        echo -e "${BLUE}Running fresh migrations & seeding database...${NC}"
        docker compose exec app php artisan migrate:fresh --seed
        ;;
    tinker|t)
        check_docker
        docker compose exec app php artisan tinker
        ;;
    shell|bash|sh)
        check_docker
        docker compose exec app bash
        ;;
    test)
        check_docker
        docker compose exec app php artisan test
        ;;
    logs|l)
        check_docker
        docker compose logs -f
        ;;
    composer)
        check_docker
        shift
        docker compose exec app composer "$@"
        ;;
    help|*)
        show_help
        ;;
esac
