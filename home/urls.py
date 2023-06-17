"""
Home App - URLS
----------------
URL Routing for Home App.
"""
from django.urls import path
from . import views


urlpatterns = [
    path('', views.Home),
]
