<x-filament-panels::page>
    @php($muted = 'font-size: 0.925rem; line-height: 1.65; color: #4b5563;')

    @unless ($configured)
        <x-filament::section>
            <x-slot name="heading">Google Drive is not set up on this server</x-slot>
            <div style="{{ $muted }} display: grid; gap: 0.75rem;">
                <p>Add these values to the server's environment (on Laravel Cloud: Environment → Variables), then reload this page:</p>
                <pre style="margin: 0; padding: 0.75rem 1rem; border-radius: 0.5rem; background: #111827; color: #f3f4f6; font-size: 0.8125rem; overflow-x: auto;"><code>GOOGLE_DRIVE_CLIENT_ID=...
GOOGLE_DRIVE_CLIENT_SECRET=...
GOOGLE_DRIVE_REDIRECT_URI={{ url('/admin/integrations/google-drive/callback') }}</code></pre>
            </div>
        </x-filament::section>
    @endunless

    <x-filament::section>
        <x-slot name="heading">Status</x-slot>
        <div style="{{ $muted }} display: grid; gap: 0.6rem;">
            @if ($connection)
                <p>Connected to <strong>{{ $connection->email ?? 'Google Drive' }}</strong>.
                    @if ($folderUrl) Backups go to the <a href="{{ $folderUrl }}" target="_blank" rel="noopener" style="color: #d97706; font-weight: 600;">{{ config('services.google_drive.folder') }}</a> folder. @endif
                </p>
                <p>
                    Last backup:
                    @if ($connection->last_backup_at)
                        <strong style="color: {{ $connection->last_backup_status === 'success' ? '#059669' : '#e11d48' }}">{{ $connection->last_backup_status === 'success' ? 'saved' : 'failed' }}</strong>
                        {{ $connection->last_backup_at->diffForHumans() }}
                        @if ($connection->last_backup_status !== 'success')<br><span style="color: #e11d48;">{{ $connection->last_backup_message }}</span>@endif
                    @else
                        none yet. Press <strong>Back up now</strong> to make the first one.
                    @endif
                </p>
                <p>A backup runs automatically every day at 02:00 (server time). The newest {{ $keep }} of each kind are kept.</p>
            @elseif ($configured)
                <p>Not connected. Press <strong>Connect Google Drive</strong>, choose your Google account and allow access.
                    The site can only see the files it creates itself, not the rest of your Drive.</p>
                <p style="font-size: 0.85rem; color: #6b7280;">Google sends you back to <code>{{ $redirectUri }}</code>. This must exactly match an
                    "Authorized redirect URI" of your OAuth client in Google Cloud, and this site must be opened on that domain.</p>
            @endif
        </div>
    </x-filament::section>

    <x-filament::section>
        <x-slot name="heading">What each backup contains</x-slot>
        <div style="{{ $muted }}">
            <ul style="list-style: disc; padding-left: 1.25rem; display: grid; gap: 0.4rem;">
                <li><strong>blog-….json</strong>: every article with its cover and the images inside it. Restore on Blog Posts → Import.</li>
                <li><strong>site-….zip</strong>: all portfolio content and uploaded files. Restore on Settings → Import / Export.</li>
                <li><strong>database-….sql.gz</strong>: the full database, including admin users and reader statistics. Restore with <code>gunzip -c file.sql.gz | mysql your_database</code>.</li>
            </ul>
        </div>
    </x-filament::section>

    @if ($connection)
        <x-filament::section>
            <x-slot name="heading">Backups in Google Drive</x-slot>
            @if ($filesError)
                <p style="color: #e11d48;">{{ $filesError }}</p>
            @elseif (count($files) === 0)
                <p style="{{ $muted }}">No backups yet.</p>
            @else
                <div style="overflow-x: auto;">
                    <table style="width: 100%; font-size: 0.875rem; border-collapse: collapse;">
                        <thead>
                            <tr style="text-align: left; color: #6b7280; border-bottom: 1px solid #e5e7eb;">
                                <th style="padding: 0.5rem 0.75rem 0.5rem 0;">File</th>
                                <th style="padding: 0.5rem 0.75rem;">Size</th>
                                <th style="padding: 0.5rem 0;">Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($files as $file)
                                <tr style="border-bottom: 1px solid #f3f4f6;">
                                    <td style="padding: 0.5rem 0.75rem 0.5rem 0;">
                                        @if ($file['url'])<a href="{{ $file['url'] }}" target="_blank" rel="noopener" style="color: #d97706; font-weight: 600;">{{ $file['name'] }}</a>@else{{ $file['name'] }}@endif
                                    </td>
                                    <td style="padding: 0.5rem 0.75rem; white-space: nowrap;">{{ number_format($file['size'] / 1048576, 2) }} MB</td>
                                    <td style="padding: 0.5rem 0; white-space: nowrap;">{{ \Illuminate\Support\Carbon::parse($file['created_at'])->timezone(config('app.timezone'))->format('M j, Y H:i') }}</td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            @endif
        </x-filament::section>
    @endif
</x-filament-panels::page>
