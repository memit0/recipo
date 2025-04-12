from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .forms import RegisterForm, RecipeForm, ReviewForm
from django.http import HttpResponseRedirect
from django.urls import reverse
from .models import Recipe, Review


def index(request):
    context = {}
    return render(request, "myapp/index.html", context)

def pizza(request):
    return render(request, "myapp/pizza.html")


def sushi(request):
    return render(request, "myapp/sushi.html")


def curry(request):
    return render(request, "myapp/curry.html")


def paella(request):
    return render(request, "myapp/paella.html")


def pho(request):
    return render(request, "myapp/pho.html")


def tacos(request):
    return render(request, "myapp/tacos.html")


def about(request):
    return render(request, "myapp/about.html")

def recipes(request):
    all_recipes = Recipe.objects.all()
    all_reviews = Review.objects.select_related('recipe', 'user')
    return render(request, "myapp/recipes.html", {
        'recipes': all_recipes,
        'reviews': all_reviews
    })

# Registration view
def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('myapp:login')
    else:
        form = RegisterForm()
    return render(request, 'myapp/register.html', {'form': form})

# Login view
def user_login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            messages.success(request, 'Login successful!')
            return redirect('myapp:index')  # Redirect to home page after login
        else:
            messages.error(request, 'Login failed. Please check your username and password.')
    else:
        form = AuthenticationForm()
    return render(request, 'myapp/login.html', {'form': form})

# Logout view
def user_logout(request):
    logout(request)
    messages.success(request, 'You have been logged out.')
    return redirect('myapp:index')

@login_required
def staff_only_view(request):
    if not request.user.is_staff:
        return redirect('myapp:index')
    return render(request, 'myapp/staff_only.html')

def account(request):
    if request.user.is_authenticated:
        return render(request, 'myapp/account.html', {'user': request.user})
    else:
        return render(request, 'myapp/register.html')

# View to create a new recipe
def create_recipe(request):
    if request.method == 'POST':
        form = RecipeForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse('myapp:recipes'))
    else:
        form = RecipeForm()
    return render(request, 'myapp/create_recipe.html', {'form': form})

# View to create a new review
def create_review(request, recipe_id):
    if request.method == 'POST':
        form = ReviewForm(request.POST)
        if form.is_valid():
            review = form.save(commit=False)
            review.recipe_id = recipe_id
            review.user = request.user
            review.save()
            return HttpResponseRedirect(reverse('myapp:recipes'))
    else:
        form = ReviewForm()
    return render(request, 'myapp/create_review.html', {'form': form})

# View to update an existing recipe
def update_recipe(request, recipe_id):
    recipe = get_object_or_404(Recipe, id=recipe_id)
    if request.method == 'POST':
        form = RecipeForm(request.POST, request.FILES, instance=recipe)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse('myapp:recipes'))
    else:
        form = RecipeForm(instance=recipe)
    return render(request, 'myapp/update_recipe.html', {'form': form})

# View to update an existing review
def update_review(request, review_id):
    review = get_object_or_404(Review, id=review_id)
    if request.method == 'POST':
        form = ReviewForm(request.POST, instance=review)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse('myapp:recipes'))
    else:
        form = ReviewForm(instance=review)
    return render(request, 'myapp/update_review.html', {'form': form})

# View to delete a recipe
def delete_recipe(request, recipe_id):
    recipe = get_object_or_404(Recipe, id=recipe_id)
    if request.method == 'POST':
        recipe.delete()
        return HttpResponseRedirect(reverse('myapp:recipes'))
    return render(request, 'myapp/delete_confirmation.html', {'object': recipe, 'type': 'recipe'})

# View to delete a review
def delete_review(request, review_id):
    review = get_object_or_404(Review, id=review_id)
    if request.method == 'POST':
        review.delete()
        return HttpResponseRedirect(reverse('myapp:recipes'))
    return render(request, 'myapp/delete_confirmation.html', {'object': review, 'type': 'review'})