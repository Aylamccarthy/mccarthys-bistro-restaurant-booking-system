from django.db import models
from django.contrib.auth.models import User

"""Model for the user profile"""


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    diet = models.TextField(blank=True, related_name="dietary requirements")
    allergies = models.TextField(blank=True, related_name="food allergies")
    favorites = models.TextField(blank=True, related_name="favorite meals")

    def __Str__(self):
        return self.user.username
