from django.contrib import admin
from .models import Recipe, Category, Review, Event, FavoriteRecipe

admin.site.register(Recipe)
admin.site.register(Category)
admin.site.register(Review)
admin.site.register(Event)
admin.site.register(FavoriteRecipe)


