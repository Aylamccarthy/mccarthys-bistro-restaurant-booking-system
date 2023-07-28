"""
Profile App - URLS
----------------
Urls Configuration for Profile App.
"""
from django.urls import path
from . import views


urlpatterns = [
    path("profiles/", views.Profile, name="profile"),
   # path("edit_profile", views.EditProfile, name="edit_profile")

]
