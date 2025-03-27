# Use PHP 8.2 with Apache
FROM php:8.2-apache-buster

# Set working directory
WORKDIR /var/www/html

# Install dependencies
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
    && rm -rf /var/lib/apt/lists/*  # Clean up apt cache

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer

# Copy Laravel project files
COPY src/ /var/www/html

# Set correct permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Update Apache configuration to serve the public folder
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

# Restart Apache to apply changes
RUN service apache2 restart

# Expose the necessary port
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]
