from django.contrib import admin
from .models import Profile


# Register your models here
@admin.register(Profile)
class Profile(admin.ModelAdmin):
    """Class to display Profile on admin"""

    list_display = (
        "name",
        "dietary_requirements",
        "food_allergies",
    )
