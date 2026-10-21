<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

/**
 * Serves uploaded files saved in the database at their usual /storage/... address.
 */
class StoredFileController extends Controller
{
    public function __invoke(Request $request, string $path): Response
    {
        $file = DB::table('stored_files')
            ->where('path', ltrim($path, '/'))
            ->where('visibility', 'public')
            ->first(['mime_type', 'size', 'checksum', 'updated_at']);

        abort_unless($file, 404);

        $etag = '"'.$file->checksum.'"';
        $headers = [
            'Content-Type' => $file->mime_type ?: 'application/octet-stream',
            'Cache-Control' => 'public, max-age=86400',
            'ETag' => $etag,
            'Last-Modified' => gmdate('D, d M Y H:i:s', strtotime((string) $file->updated_at)).' GMT',
            'X-Content-Type-Options' => 'nosniff',
            // An uploaded SVG or HTML file cannot run scripts on this site.
            'Content-Security-Policy' => "default-src 'none'; img-src 'self' data:; style-src 'unsafe-inline'; sandbox",
        ];

        if (trim((string) $request->header('If-None-Match')) === $etag) {
            return response('', 304, $headers);
        }

        $contents = DB::table('stored_files')->where('path', ltrim($path, '/'))->value('contents');

        return response(is_resource($contents) ? stream_get_contents($contents) : $contents, 200, $headers + ['Content-Length' => (string) $file->size]);
    }
}
