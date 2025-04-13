FROM php:8.2-fpm-alpine

WORKDIR /var/www/html

# Install Node.js, npm, and other PHP dependencies in a single RUN command
RUN apt-get update && apt-get upgrade -y && apt-get install -y \
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
    && rm -rf /var/lib/apt/lists/*  # Clean up apt cache to reduce image size

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer

# phpMyAdmin specific setup (if necessary)
RUN mkdir -p /var/www/phpMyAdmin/bash \
    && touch /var/www/phpMyAdmin/bash/bash.sh \
    && mkdir -p /var/www/phpMyAdmin/src

# --- Add Non-root User ---
RUN useradd -u 10014 -m laraveluser && \
    chown -R laraveluser:laraveluser /var/www

# Switch to the non-root user
USER 10014

# Expose the necessary ports
EXPOSE 80
