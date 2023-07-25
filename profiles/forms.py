from django import forms
from .models import Profile


class ProfileForm(forms.modelForm):
    """Form to create and update user profile"""
    class Meta:
        model = Profile
        fields = ('dietary_requirements', 'food_allergies', 'favorite_meals')
        labels = {
            "dietary_requirements": "Dietary Requirements",
            "food_allergies": "Food Allergies",
            "favorite_meals": "Favorite Meals",
        }
