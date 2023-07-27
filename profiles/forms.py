from django import forms
from .models import Profile


class ProfileForm(forms.ModelForm):
    """Form to create and update user profile"""

    class Meta:
        model = Profile
        fields = ("name", "dietary_requirements", "food_allergies")
        labels = {
            "name": "Name",
            "dietary_requirements": "Dietary Requirements",
            "food_allergies": "Food Allergies",
        }
