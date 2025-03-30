# Use the official PHP image with Apache
FROM php:8.2-apache-buster

# Set working directory
WORKDIR /var/www/html

# Install necessary PHP extensions
RUN apt-get update && apt-get install -y \
    unzip \
    curl \
    libpng-dev \
    zlib1g-dev \
    libzip-dev \
    libxml2-dev \
    default-mysql-client \
    && docker-php-ext-install pdo_mysql gd zip

# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php && mv composer.phar /usr/local/bin/composer

# Copy all Laravel project files
COPY . .

# Ensure necessary directories exist
RUN mkdir -p storage/framework/{sessions,views,cache} bootstrap/cache

# Set permissions
RUN chown -R www-data:www-data storage bootstrap/cache
RUN chmod -R 775 storage bootstrap/cache

# Install PHP dependencies

# Generate application key

# Expose the web server port
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]
