from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


"""Model for the user profile"""


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(blank=True, max_length=200)
    dietary_requirements = models.CharField(blank=True, max_length=200)
    food_allergies = models.CharField(blank=True, max_length=200)

    def __Str__(self):
        return str(self.name)


@receiver(post_save, sender=User)
def create_user_profile(instance, created, **kwargs):
    """Create or update the user profile"""
    if created:
        Profile.objects.create(user=instance)
