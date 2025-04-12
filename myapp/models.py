from django.db import models
from django.contrib.auth.models import User

# Recipe model represents a cooking recipe with its details
class Recipe(models.Model):
    name = models.CharField(max_length=100)  # Name of the recipe
    description = models.TextField()  # Brief description of the recipe
    ingredients = models.TextField()  # List of ingredients needed
    instructions = models.TextField()  # Step-by-step cooking instructions
    image = models.ImageField(upload_to='recipes/', blank=True, null=True)  # Recipe image
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp of creation

    def __str__(self):
        return self.name
    
# Category model for organizing recipes into different categories
class Category(models.Model):
    name = models.CharField(max_length=50)  # Name of the category
    description = models.TextField(blank=True, null=True)  # Optional category description

    def __str__(self):
        return self.name
    
# Review model for user reviews and ratings of recipes
class Review(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)  # Reference to the recipe being reviewed
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # User who wrote the review
    rating = models.IntegerField()  # Rating score (e.g., 1-5)
    comment = models.TextField(blank=True, null=True)  # Optional review text
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp of review

    def __str__(self):
        return f"{self.user.username} - {self.recipe.name}"
    
# Event model for cooking-related events or workshops
class Event(models.Model):
    title = models.CharField(max_length=100)  # Event title
    description = models.TextField()  # Event details
    date = models.DateTimeField()  # Event date and time
    location = models.CharField(max_length=200)  # Event location

    def __str__(self):
        return self.title
    
# FavoriteRecipe model to track user's favorite recipes
class FavoriteRecipe(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # User who favorited the recipe
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)  # The favorited recipe
    added_at = models.DateTimeField(auto_now_add=True)  # When the recipe was favorited

    def __str__(self):
        return f"{self.user.username} - {self.recipe.name}"

# UserProfile model extends the default User model with additional information
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # Link to Django's User model
    address = models.CharField(max_length=255, blank=True, null=True)  # User's address
    phone_number = models.CharField(max_length=15, blank=True, null=True)  # User's phone number

    def __str__(self):
        return self.user.username