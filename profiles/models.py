from django.db import models
from django.contrib.auth.models import User

"""Model for the user profile"""


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    dietary_requirements = models.CharField(blank=True, max_length=200)
    food_allergies = models.CharField(blank=True, max_length=200)

    def __Str__(self):
        return self.user.username
