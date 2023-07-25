"""
Profile App - URLS
----------------
Urls Configuration for Profile App.
"""
from django.urls import path
from . import views


urlpatterns = [
    path('profiles/', views.update_profile, name='update_profile'),
]
