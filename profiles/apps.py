from django.apps import AppConfig
from django.dispatch import receiver


class ProfilesConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "profiles"
