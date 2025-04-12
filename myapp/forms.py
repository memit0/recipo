from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Recipe, Review

# Form for handling user questions
class QuestionForm(forms.Form):
   question_text = forms.CharField(required=True)

# Form for user registration, extends Django's built-in UserCreationForm
class RegisterForm(UserCreationForm):
    email = forms.EmailField(required=True)  # Additional email field for registration

    class Meta:
        model = User
        fields = ["username", "email", "password1", "password2"]  # Fields to include in the form

# Form for creating and updating recipes
class RecipeForm(forms.ModelForm):
    class Meta:
        model = Recipe
        fields = ['name', 'description', 'ingredients', 'instructions', 'image']  # Recipe fields to include

# Form for creating and updating reviews
class ReviewForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = ['rating', 'comment']  # Review fields to include
