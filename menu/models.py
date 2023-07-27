"""
Menu App - Models
----------------
Models for Menu App.
"""
from django.db import models
from cloudinary.models import CloudinaryField
from django.conf import settings


class Menu(models.Model):
    """Model to create a menu"""
    name = models.CharField(max_length=100, unique=True)
    price = models.FloatField()
    ingredients = models.CharField(max_length=1000)
    cover = CloudinaryField('image', default='https://res.cloudinary.com/aylamccarthy/image/upload/v1690467352/pexels-dana-tentis-725991_dj1rmi.jpg')