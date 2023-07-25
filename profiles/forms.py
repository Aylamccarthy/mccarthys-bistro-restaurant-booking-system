from django import forms
from .models import Profile


class ProfileForm(forms.ModelForm):
    """Form to create and update user profile"""
    class Meta:
        model = Profile
        fields = ('dietary_requirements', 'food_allergies')
        labels = {
            "dietary_requirements": "Dietary Requirements",
            "food_allergies": "Food Allergies",
        }
