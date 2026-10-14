#!/usr/bin/env bash
#
# Runs scripts/backup-to-drive.sh every day at 02:00 (and at the next wake-up if the Mac was asleep).
# Usage: scripts/install-drive-backup.sh            install or update
#        scripts/install-drive-backup.sh uninstall  remove
set -euo pipefail

LABEL="dev.portfolio.drive-backup"
PLIST="$HOME/Library/LaunchAgents/$LABEL.plist"
SCRIPT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/backup-to-drive.sh"
LOG="$HOME/Library/Logs/portfolio-drive-backup.log"

launchctl bootout "gui/$(id -u)/$LABEL" 2>/dev/null || true

if [ "${1:-}" = "uninstall" ]; then
    rm -f "$PLIST"
    echo "Daily backup removed."
    exit 0
fi

mkdir -p "$HOME/Library/LaunchAgents"
cat > "$PLIST" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key><string>$LABEL</string>
    <key>ProgramArguments</key>
    <array><string>/bin/bash</string><string>$SCRIPT</string></array>
    <key>StartCalendarInterval</key>
    <dict><key>Hour</key><integer>2</integer><key>Minute</key><integer>0</integer></dict>
    <key>StandardOutPath</key><string>$LOG</string>
    <key>StandardErrorPath</key><string>$LOG</string>
</dict>
</plist>
PLIST

launchctl bootstrap "gui/$(id -u)" "$PLIST"
echo "Daily backup installed (02:00). Log: $LOG"
echo "Run one now with: launchctl kickstart gui/$(id -u)/$LABEL"
