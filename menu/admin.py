"""
Menu App - Admin
----------------
Admin Configuration for Menu App.
"""
from django.contrib import admin

from menu.models import Menu


# Register your models here.
@admin.register(Menu)
class Menu(admin.ModelAdmin):
    """Class to display menu items on admin"""

    list_display = (
        "name",
        "price",
        "ingredients",
        "cover",
    )
