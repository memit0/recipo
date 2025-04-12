from django.urls import path
from django.contrib.auth import views as auth_views

from . import views

app_name = "myapp"
urlpatterns = [
    path("", views.index, name="index"),
    path("pizza/", views.pizza, name="pizza"),
    path("sushi/", views.sushi, name="sushi"),
    path("curry/", views.curry, name="curry"),
    path("paella/", views.paella, name="paella"),
    path("pho/", views.pho, name="pho"),
    path("tacos/", views.tacos, name="tacos"),
    path("about/", views.about, name="about"),
    path("recipes/", views.recipes, name="recipes"),
    path("favorites/", views.favorites, name="favorites"),
    path("staff-only/", views.staff_only_view, name="staff_only"),
    path("register/", views.register, name="register"),
    path("login/", auth_views.LoginView.as_view(template_name='myapp/login.html'), name="login"),
    path("logout/", auth_views.LogoutView.as_view(next_page='/'), name="logout"),
    path("account/", views.account, name="account"),
    path('recipes/create/', views.create_recipe, name='create_recipe'),
    path('reviews/create/<int:recipe_id>/', views.create_review, name='create_review'),
    path('recipes/update/<int:recipe_id>/', views.update_recipe, name='update_recipe'),
    path('reviews/update/<int:review_id>/', views.update_review, name='update_review'),
    path('recipes/delete/<int:recipe_id>/', views.delete_recipe, name='delete_recipe'),
    path('reviews/delete/<int:review_id>/', views.delete_review, name='delete_review'),
    path('recipes/toggle-favorite/<int:recipe_id>/', views.toggle_favorite, name='toggle_favorite'),
]