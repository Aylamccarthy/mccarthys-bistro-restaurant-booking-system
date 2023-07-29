"""
Profile App - URLS
----------------
Urls Configuration for Profile App.
"""
from django.urls import path
from . import views


urlpatterns = [
    path("profile", views.profile, name="profile"),
    path("profile/profile", views.update_profile, name="update_profile"),
]
