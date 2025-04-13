FROM php:8.2-apache-buster

WORKDIR /var/www/html

# Install Node.js, npm, and other PHP dependencies
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
    && rm -rf /var/lib/apt/lists/*

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php && mv composer.phar /usr/local/bin/composer

# phpMyAdmin specific setup (if necessary)
RUN mkdir -p /var/www/phpMyAdmin/bash && \
    touch /var/www/phpMyAdmin/bash/bash.sh && \
    mkdir -p /var/www/phpMyAdmin/src

# Fix Apache warning and change port to 8080 for non-root
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf && \
    sed -i 's/80/8080/g' /etc/apache2/ports.conf && \
    sed -i 's/*:80/*:8080/g' /etc/apache2/sites-enabled/000-default.conf

# --- Add Non-root User ---
RUN useradd -u 10014 -m laraveluser && \
    chown -R laraveluser:laraveluser /var/www

RUN chown -R laraveluser:laraveluser /var/www/html/storage /var/www/html/bootstrap/cache

# Switch to the non-root user
USER 10014

# Expose the new Apache port
EXPOSE 8080

CMD ["apache2-foreground"]
RUN chown-R laraveluser:laraveluser /var/www/html/storage /var/www/html/bootstrap/cache