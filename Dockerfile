# Use the official PHP image with Apache
FROM php:8.2-apache-buster

# Set working directory
WORKDIR /var/www/html

# Copy only necessary files first to optimize build caching
COPY composer.json composer.lock ./
RUN apt-get update && apt-get install -y unzip \
    && curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer \
    && composer install --no-dev --optimize-autoloader

# Copy the rest of the application
# Ensure necessary directories exist
RUN mkdir -p storage/framework/{sessions,views,cache} bootstrap/cache

# Set correct permissions
RUN chown -R www-data:www-data storage bootstrap/cache
RUN chmod -R 775 storage bootstrap/cache

# Generate application key
RUN php artisan key:generate

# Set Apache to serve from the Laravel public directory
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

# Expose the web server port
EXPOSE 80

# Start Apache with permissions fix
CMD ["sh", "-c", "chmod -R 775 storage bootstrap/cache && apache2-foreground"]
