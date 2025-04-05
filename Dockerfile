FROM php:8.1-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    zip \
    unzip \
    curl \
    git \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    && docker-php-ext-configure gd \
        --with-freetype \
        --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        gd pdo pdo_mysql mbstring tokenizer xml bcmath zip

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set environment variable for Composer
ENV COMPOSER_MEMORY_LIMIT=-1

# Set working directory
WORKDIR /var/www

# Copy app files
COPY . .

# Set permissions
RUN chown -R www-data:www-data /var/www

# Switch to www-data before Composer
USER www-data

# Install Laravel dependencies
RUN composer install --no-dev --optimize-autoloader

# Switch back to root for CMD
USER root

# Expose port
EXPOSE 9000

CMD ["php-fpm"]
