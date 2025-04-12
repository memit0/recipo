#!/bin/sh
set -ex

# Move to application directory
cd /app

# Wait for database to be ready (optional but recommended)
# You can add a wait-for-it.sh script if needed

# Run any new database migrations
python ./manage.py migrate

# Create Admin User, ignore errors if it already exists
python ./manage.py createsuperuser --noinput || true

# Collect static files
python ./manage.py collectstatic --noinput

# Run Django's development server
python ./manage.py runserver 0.0.0.0:8000