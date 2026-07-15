<?php

namespace Database\Factories;

use App\Models\CodeSnippet;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CodeSnippetFactory extends Factory
{
    protected $model = CodeSnippet::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        $snippets = [
            [
                'title' => 'Laravel Custom Middleware',
                'language' => 'PHP',
                'category' => 'Backend',
                'description' => 'A middleware to enforce dynamic rate limits based on user roles.',
                'code' => '<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DynamicRateLimit
{
    public function handle(Request $request, Closure $next, string $role): Response
    {
        $limit = $role === \'premium\' ? 100 : 20;
        
        if ($request->user() && $request->user()->rate_count > $limit) {
            return response()->json([\'error\' => \'Rate limit exceeded\'], 429);
        }
        
        return $next($request);
    }
}',
                'tags' => ['laravel', 'middleware', 'security']
            ],
            [
                'title' => 'React Auto-Resize Textarea Hook',
                'language' => 'TypeScript',
                'category' => 'Frontend',
                'description' => 'A React hook that automatically adjusts the height of a textarea based on its contents.',
                'code' => 'import { useEffect, useRef } from \'react\';

export function useAutosizeTextArea(value: string) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = \'auto\';
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = scrollHeight + \'px\';
    }
  }, [value]);

  return textAreaRef;
}',
                'tags' => ['react', 'hooks', 'typescript']
            ],
            [
                'title' => 'Shopify Liquid Custom Grid',
                'language' => 'Liquid',
                'category' => 'CMS',
                'description' => 'A Shopify liquid template snippet to display dynamic collections in a custom CSS grid.',
                'code' => '{%- assign collection = collections[section.settings.collection] -%}
<div class="custom-grid">
  {%- for product in collection.products limit: 4 -%}
    <div class="grid-item">
      <a href="{{ product.url }}">
        <img src="{{ product.featured_image | img_url: \'300x300\' }}" alt="{{ product.title }}">
        <h3>{{ product.title }}</h3>
        <p>{{ product.price | money }}</p>
      </a>
    </div>
  {%- endfor -%}
</div>',
                'tags' => ['shopify', 'liquid', 'e-commerce']
            ]
        ];

        $snippet = fake()->unique()->randomElement($snippets);

        return [
            'title' => $snippet['title'],
            'slug' => Str::slug($snippet['title']),
            'description' => $snippet['description'],
            'language' => $snippet['language'],
            'code' => $snippet['code'],
            'category' => $snippet['category'],
            'tags' => $snippet['tags'],
        ];
    }
}
