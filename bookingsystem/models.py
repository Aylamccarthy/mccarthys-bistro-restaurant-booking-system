"""
Booking System App - Models
-----------------------
Models for Booking  System App
"""

from django.db import models
from cloudinary.models import CloudinaryField
from django.conf import settings


class Table(models.Model):
    """Model for the table object"""
    title = models.CharField(max_length=15, unique=True)
    free_table_img = CloudinaryField('free_table_img')
    occupied_table_img = CloudinaryField('occupied_table_img')
    no_of_guests = models.IntegerField(default=1)

    def __str__(self):
        return self.code
