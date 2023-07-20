"""
Menu App - Views
----------------
Views for Menu App.
"""
from django.views.generic import ListView
from django.shortcuts import render


class Menu(ListView):
    """
    A view to render menu page
    """

    template_name = "menu.html"
  
