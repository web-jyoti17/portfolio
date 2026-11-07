<?php

namespace App\Http\Controllers;

use App\Services\PortfolioAssistant;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Throwable;

class AssistantController extends Controller
{
    /**
     * Whether the assistant is switched on, and the starter questions.
     */
    public function show(PortfolioAssistant $assistant): JsonResponse
    {
        return response()->json([
            'enabled' => PortfolioAssistant::isConfigured(),
            'name' => $assistant->ownerName(),
            'suggestions' => $assistant->suggestions(),
        ]);
    }

    /**
     * Answer a visitor's question, streamed as plain text.
     */
    public function chat(Request $request, PortfolioAssistant $assistant): StreamedResponse|JsonResponse
    {
        $validated = $request->validate([
            'messages' => 'required|array|min:1|max:20',
            'messages.*.role' => 'required|in:user,assistant',
            'messages.*.content' => 'required|string|max:2000',
        ]);

        $messages = array_values(array_map(
            fn (array $message) => ['role' => $message['role'], 'content' => trim($message['content'])],
            $validated['messages'],
        ));

        if ($messages[0]['role'] !== 'user' || end($messages)['role'] !== 'user') {
            return response()->json(['message' => 'The conversation must start and end with a question.'], 422);
        }

        if (! PortfolioAssistant::isConfigured()) {
            return response()->json(['message' => 'The assistant is not available right now.'], 503);
        }

        $limit = (int) config('services.anthropic.daily_limit');
        if (! RateLimiter::attempt('assistant:'.$request->ip(), $limit, fn () => true, 86400)) {
            return response()->json(['message' => "You've reached today's question limit. Please use the contact form and I'll get back to you!"], 429);
        }

        return response()->stream(function () use ($assistant, $messages) {
            try {
                foreach ($assistant->stream($messages) as $chunk) {
                    echo $chunk;
                    if (ob_get_level() > 0) {
                        ob_flush();
                    }
                    flush();
                }
            } catch (Throwable $e) {
                Log::warning('Portfolio assistant failed', ['error' => $e->getMessage()]);
                echo "\n\nSorry, I couldn't answer just now. Please try again in a moment, or use the contact form.";
            }
        }, 200, [
            'Content-Type' => 'text/plain; charset=utf-8',
            'Cache-Control' => 'no-cache, no-store',
            // Let nginx pass the answer through as it is written
            'X-Accel-Buffering' => 'no',
        ]);
    }
}
