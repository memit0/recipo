# Django Recipe Application

A modern web application for managing and sharing recipes, built with Django. This application allows users to create, view, and manage recipes, leave reviews, and save favorites.

## Features

- User authentication and authorization
- Recipe management (create, read, update, delete)
- Recipe categories
- User reviews and ratings
- Favorite recipes
- User profiles
- Admin dashboard
- Responsive design

## Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- Virtual environment (recommended)
- Docker installed on your system (for Docker deployment)
- MySQL server running locally (or accessible)
- Port 8000 available on your system

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd django_een1037_example
```

2. Create and activate a virtual environment:
```bash
# On macOS/Linux
python3 -m venv venv
source venv/bin/activate

# On Windows
python -m venv venv
venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure the database:
```bash
python manage.py migrate
```

5. Create a superuser (admin):
```bash
python manage.py createsuperuser
```

## Docker Deployment

For production deployment using Docker:

1. First, create a Docker volume for persistent storage:
```bash
docker volume create myapp-storage
```

2. Build the Docker image:
```bash
docker build -t myapp .
```

3. Run the container with the following command:
```bash
docker run -ti \
  -e DATABASE_URL="mysql://myappdbuser:myappdbpass@host.docker.internal:3306/myappdb" \
  -v myapp-storage:/app/storage \
  -p 8000:8000 \
  myapp
```

### Docker Environment Variables

- `DATABASE_URL`: MySQL connection string in the format:
  `mysql://username:password@host:port/database`
  - username: Database username
  - password: Database password
  - host: Database host (use `host.docker.internal` for local MySQL)
  - port: Database port (default: 3306)
  - database: Database name

### Docker Database Setup

Before running the Docker container, ensure you have:

1. Created a MySQL database named `myappdb`
2. Created a user with appropriate permissions:
```sql
CREATE DATABASE myappdb;
CREATE USER 'myappdbuser'@'%' IDENTIFIED BY 'myappdbpass';
GRANT ALL PRIVILEGES ON myappdb.* TO 'myappdbuser'@'%';
FLUSH PRIVILEGES;
```

## Running the Application

### Local Development
1. Start the development server:
```bash
python manage.py runserver
```

2. Access the application:
   - Main site: http://127.0.0.1:8000/
   - Admin panel: http://127.0.0.1:8000/admin/

### Docker Deployment
Once the container is running, you can access the web application at:
http://localhost:8000

## Configuration

1. Environment Variables:
   Create a `.env` file in the project root with the following variables:
   ```
   DEBUG=True
   SECRET_KEY=your-secret-key
   DATABASE_URL=your-database-url
   ```

2. Static Files:
   ```bash
   python manage.py collectstatic
   ```

3. Media Files:
   - Create a `media` directory in your project root
   - Configure your web server to serve media files from this directory

## Project Structure

```
django_een1037_example/
├── myapp/
│   ├── migrations/
│   ├── static/
│   ├── templates/
│   ├── admin.py
│   ├── models.py
│   ├── views.py
│   └── urls.py
├── media/
├── static/
├── templates/
├── manage.py
└── requirements.txt
```

## User Roles

- **Regular Users**: Can view recipes, leave reviews, and save favorites
- **Admin Users**: Have full access to manage all content and users

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the project maintainers.

## Acknowledgments

- Django Framework
- Bootstrap for styling
- All contributors who have helped improve this project 