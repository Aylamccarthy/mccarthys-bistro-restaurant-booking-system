"""
Reviews App - URLS
----------------
URLS configuration for Review App.
"""
from django.urls import path
from . import views


urlpatterns = [
    path('reviews', views.Review.as_view(), name='reviews'),
]
