"""
Reviews App - Admin
----------------
Admin Configuration for Reviews App.
"""
from django.contrib import admin
from reviews.models import Review


admin.site.register(Review)
