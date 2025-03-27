# Use the official PHP image with Apache
FROM php:8.2-apache-buster

WORKDIR /var/www/html

# Install necessary PHP and system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    libpng-dev \
    zlib1g-dev \
    libxml2-dev \
    libzip-dev \
    libonig-dev \
    zip \
    unzip \
    default-mysql-client \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && docker-php-ext-configure gd \
    && docker-php-ext-install -j$(nproc) gd pdo_mysql mysqli zip \
    && docker-php-source delete \
    && a2enmod rewrite \
    && rm -rf /var/lib/apt/lists/*

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer

# Copy Laravel project files
COPY . .

# Ensure .env file exists
RUN cp .env.example .env

# Set correct permissions
RUN chmod -R 777 storage bootstrap/cache

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Generate app key
RUN php artisan key:generate

# Clear and cache configuration
RUN php artisan config:clear && php artisan config:cache

# Set Apache to serve from the Laravel public directory
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

# Expose the web server port
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]
