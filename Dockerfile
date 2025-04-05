FROM php:8.1-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    zip unzip curl git \
    libpng-dev libjpeg-dev libfreetype6-dev libonig-dev libxml2-dev libzip-dev \
    && docker-php-ext-install -j$(nproc) \
       pdo pdo_mysql mbstring tokenizer xml bcmath zip gd

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set Composer memory limit
ENV COMPOSER_MEMORY_LIMIT=-1

# Set working directory
WORKDIR /var/www

# Copy application code
COPY . .

# Set permissions
RUN chown -R www-data:www-data /var/www

# Switch to www-data user
USER www-data

# Install Laravel dependencies
RUN composer install --no-dev --optimize-autoloader

# Switch back to root for CMD
USER root

# Expose the port (for Render)
EXPOSE 9000

# Start PHP-FPM server
CMD ["php-fpm"]
