"""
Reviews App - Models
----------------
Models for Reviews App.
"""
import datetime
from django.db import models
from django.conf import settings
from django.contrib.auth.models import User


class Review(models.Model):
    """Model for Review Post"""

    rate = models.PositiveSmallIntegerField()
    review_text = models.TextField()
    now = datetime.datetime.now()
    date_created_on = models.DateTimeField(default=now.strftime
                                           ("%Y-%m-%d %H:%M:%S"))
    date_updated_on = models.DateTimeField(default=now.strftime
                                           ("%Y-%m-%d %H:%M:%S"))
    author = models.ForeignKey(User, on_delete=models.CASCADE, blank=True)

    class Meta:
        ordering = ["date_updated_on"]

    def __str__(self):
        return f"Review {self.review_text} by {self.author}"
