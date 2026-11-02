<x-filament-panels::page>
    <x-filament::section>
        <x-slot name="heading">Move the whole portfolio between sites</x-slot>

        <div style="display: grid; gap: 0.9rem; font-size: 0.925rem; line-height: 1.65; color: #4b5563;">
            <p>
                <strong>Export everything</strong> downloads one .zip file with all your content
                (sections, projects, case studies, articles, skills, experience, toolkit, snippets and site settings)
                and every uploaded file: article images, case study covers, your resume and favicon.
            </p>
            <p>
                <strong>Import a site export</strong> on another copy of the site (for example your live site)
                replaces its content with the file. Images arrive with it, so nothing has to be uploaded again.
                Admin logins and passwords are never exported or changed.
            </p>
            <p>
                This server accepts uploads up to <strong>{{ $uploadLimit }}</strong>. If your export is larger,
                copy the file to the server and run:
            </p>
            <pre style="margin: 0; padding: 0.75rem 1rem; border-radius: 0.5rem; background: #111827; color: #f3f4f6; font-size: 0.8125rem; overflow-x: auto;"><code>php artisan site:import path/to/portfolio-export.zip</code></pre>
            <p style="font-size: 0.85rem; color: #6b7280;">
                To move only articles, use Import / Export on the Blog Posts page instead.
            </p>
        </div>
    </x-filament::section>
</x-filament-panels::page>
