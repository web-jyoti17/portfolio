#!/usr/bin/env bash
#
# Backs up the portfolio to Google Drive:
#   blog-YYYY-MM-DD-HHMMSS.json      every blog post with its cover and article images
#                                    (restore: Blog Posts → Import, or php artisan blog:import)
#   site-YYYY-MM-DD-HHMMSS.zip       all content tables and uploaded files
#                                    (restore: Admin → Import / Export, or php artisan site:import)
#   database-YYYY-MM-DD-HHMMSS.sql.gz full MySQL dump, including admin users
#                                    (restore: see DOCKER.md, "Backups to Google Drive")
#
# Needs Google Drive for desktop, which syncs a "My Drive" folder on this Mac.
# Usage: scripts/backup-to-drive.sh            (finds the Drive folder automatically)
#        BACKUP_DIR=/some/folder scripts/backup-to-drive.sh
set -euo pipefail

export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"   # launchd starts with a minimal PATH

PROJECT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../src" && pwd)"
KEEP="${KEEP:-30}"   # how many backups of each kind to keep

if [ -z "${BACKUP_DIR:-}" ]; then
    DRIVE="$(find "$HOME/Library/CloudStorage" -maxdepth 1 -name 'GoogleDrive-*' 2>/dev/null | head -n 1 || true)"
    if [ -z "$DRIVE" ]; then
        echo "Google Drive for desktop was not found in ~/Library/CloudStorage." >&2
        echo "Install it from https://www.google.com/drive/download/ and sign in, or set BACKUP_DIR." >&2
        exit 1
    fi
    BACKUP_DIR="$DRIVE/My Drive/Portfolio Backups"
fi

mkdir -p "$BACKUP_DIR"
STAMP="$(date +%Y-%m-%d-%H%M%S)"
TMP="storage/app/backup-tmp"
mkdir -p "$PROJECT/$TMP"
trap 'rm -rf "$PROJECT/$TMP"' EXIT

echo "Exporting blog posts..."
docker exec laravel-app php artisan blog:export "$TMP/blog.json"

echo "Exporting site content and uploads..."
docker exec laravel-app php artisan site:export "$TMP/site.zip"

echo "Dumping the database..."
docker exec laravel-db sh -c 'exec mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" --single-transaction --routines --triggers --databases "$MYSQL_DATABASE"' 2>/dev/null \
    | gzip > "$PROJECT/$TMP/database.sql.gz"
# A dump that did not finish has no completion marker; never replace good backups with it.
gzip -dc "$PROJECT/$TMP/database.sql.gz" | tail -n 1 | grep -q 'Dump completed' || { echo "Database dump failed." >&2; exit 1; }

cp "$PROJECT/$TMP/blog.json" "$BACKUP_DIR/blog-$STAMP.json"
cp "$PROJECT/$TMP/site.zip" "$BACKUP_DIR/site-$STAMP.zip"
cp "$PROJECT/$TMP/database.sql.gz" "$BACKUP_DIR/database-$STAMP.sql.gz"

for kind in blog site database; do
    ls -1t "$BACKUP_DIR"/"$kind"-* 2>/dev/null | tail -n +"$((KEEP + 1))" | while IFS= read -r old; do rm -f "$old"; done
done

echo "Backup saved to $BACKUP_DIR ($STAMP)"
