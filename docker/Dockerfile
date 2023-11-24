# Start from your Laravel base image
FROM docker.io/bitnami/laravel:10

# Install Node.js and npm
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

# Set the working directory in the container
WORKDIR /app

# Copy the entire Laravel project (including React files) into the container
COPY . .

# Install PHP dependencies if needed
# RUN composer install

# Install Node.js dependencies and build React assets
RUN npm install
RUN npm run build

# Reset bitnami script as entrypoint
ENTRYPOINT [ "/opt/bitnami/scripts/laravel/entrypoint.sh" ]

# Run the Laravel server or any other commands needed
CMD ["php", "artisan", "serve", "--host=0.0.0.0"]