# Set the base image
FROM php:8.1-fpm

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    curl \
    git \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql mbstring tokenizer xml bcmath zip

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set environment variable for Composer
ENV COMPOSER_MEMORY_LIMIT=-1

# Set working directory
WORKDIR /var/www

# Copy Laravel app into container
COPY . .

# Set permissions before Composer install
RUN chown -R www-data:www-data /var/www

# Run Composer as www-data (safer)
USER www-data

# Install Laravel dependencies
RUN composer install --no-dev --optimize-autoloader

# Set back to root for CMD
USER root

# Expose port
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]
