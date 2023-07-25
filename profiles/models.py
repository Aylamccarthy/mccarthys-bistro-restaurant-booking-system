from django.db import models
from django.contrib.auth.models import User

"""Model for the user profile"""


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    dietary_requirements = models.TextField(blank=True, name="dietary requirements")
    food_allergies = models.TextField(blank=True, name="food allergies")
    favorite_meals = models.TextField(blank=True, name="favorite meals")

    def __Str__(self):
        return self.user.username
