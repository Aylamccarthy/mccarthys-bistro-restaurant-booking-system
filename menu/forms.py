from django import forms
from .models import Menu


class MenuForm(forms.ModelForm):
    """
    Form to create and edit a Menu

    """

    class Meta:
        model = Menu
        fields = ["name", "cover", "price", "ingredients"]
        
        labels = {
            'name': 'Dish Name',
            "cover": "Image URL",
            "price": "Price",
            "ingredients": "Ingredients",
        }
