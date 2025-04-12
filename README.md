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

## Running the Application

1. Start the development server:
```bash
python manage.py runserver
```

2. Access the application:
   - Main site: http://127.0.0.1:8000/
   - Admin panel: http://127.0.0.1:8000/admin/

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