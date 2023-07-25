from django.contrib import admin
from .models import Profile


# Register your models here.
@admin.register(Profile)
class Profile(admin.ModelAdmin):
    """ Class to display menu items on admin """
    list_display = (
        'dietary requirements',
        'allergies',
        'favorite meal',
    )