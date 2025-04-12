from django.urls import path
from django.contrib.auth import views as auth_views

from . import views

app_name = "myapp"  # Namespace for the app's URLs

urlpatterns = [
    # Basic page views
    path("", views.index, name="index"),  # Home page
    path("about/", views.about, name="about"),  # About page
    
    # Recipe-specific cuisine pages
    path("pizza/", views.pizza, name="pizza"),
    path("pizza.html", views.pizza, name="pizza_html"),
    path("sushi/", views.sushi, name="sushi"),
    path("sushi.html", views.sushi, name="sushi_html"),
    path("curry/", views.curry, name="curry"),
    path("curry.html", views.curry, name="curry_html"),
    path("paella/", views.paella, name="paella"),
    path("paella.html", views.paella, name="paella_html"),
    path("pho/", views.pho, name="pho"),
    path("pho.html", views.pho, name="pho_html"),
    path("tacos/", views.tacos, name="tacos"),
    path("tacos.html", views.tacos, name="tacos_html"),
    
    # Recipe and review management
    path("recipes/", views.recipes, name="recipes"),  # List all recipes
    path("favorites/", views.favorites, name="favorites"),  # User's favorite recipes
    path('recipes/create/', views.create_recipe, name='create_recipe'),  # Create new recipe
    path('recipes/update/<int:recipe_id>/', views.update_recipe, name='update_recipe'),  # Update existing recipe
    path('recipes/delete/<int:recipe_id>/', views.delete_recipe, name='delete_recipe'),  # Delete recipe
    path('reviews/create/<int:recipe_id>/', views.create_review, name='create_review'),  # Create new review
    path('reviews/update/<int:review_id>/', views.update_review, name='update_review'),  # Update existing review
    path('reviews/delete/<int:review_id>/', views.delete_review, name='delete_review'),  # Delete review
    path('recipes/toggle-favorite/<int:recipe_id>/', views.toggle_favorite, name='toggle_favorite'),  # Toggle favorite status
    
    # User authentication and account management
    path("staff-only/", views.staff_only_view, name="staff_only"),  # Staff-only page
    path("register/", views.register, name="register"),  # User registration
    path("login/", auth_views.LoginView.as_view(template_name='myapp/login.html'), name="login"),  # User login
    path("logout/", auth_views.LogoutView.as_view(next_page='/'), name="logout"),  # User logout
    path("account/", views.account, name="account"),  # User account page
]