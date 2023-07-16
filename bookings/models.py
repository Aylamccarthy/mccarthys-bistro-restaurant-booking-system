from django.db import models
from cloudinary.models import CloudinaryField
from operator import truediv


class Table(models.Model):
    """Model for table object"""

    code = models.CharField(max_length=10, unique=True)
    featured_image = CloudinaryField("image")
    no_of_persons = models.IntegerField(default=1)

    def __str__(self):
        return self.code


class Booking(models.Model):
    """Model for booking object"""

    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    # table = models.ForeignKey(Table, on_delete=models.CASCADE, null = True)
    customer_full_name = models.CharField(max_length=200, blank=True)
    customer_email = models.EmailField(max_length=200, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["date"]
