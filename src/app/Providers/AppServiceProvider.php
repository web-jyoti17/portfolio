<?php

namespace App\Providers;

use App\Filesystem\DatabaseAdapter;
use App\Http\Controllers\StoredFileController;
use Carbon\CarbonImmutable;
use Illuminate\Filesystem\FilesystemAdapter;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;
use League\Flysystem\Filesystem;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDefaults();
        $this->configureDatabaseStorage();
    }

    /**
     * Uploaded files are kept in the database (the "database" disk driver) and served
     * at /storage/... without sessions or cookies, so they survive every deploy.
     */
    protected function configureDatabaseStorage(): void
    {
        Storage::extend('database', fn ($app, array $config) => new FilesystemAdapter(
            new Filesystem($adapter = new DatabaseAdapter($config['url'] ?? '/storage'), $config),
            $adapter,
            $config,
        ));

        if (config('filesystems.disks.public.driver') === 'database' && ! $this->app->routesAreCached()) {
            Route::get('storage/{path}', StoredFileController::class)
                ->where('path', '.*')
                ->name('stored-file');
        }
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null,
        );
    }
}
