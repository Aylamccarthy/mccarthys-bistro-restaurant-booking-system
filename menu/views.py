"""
Menu App - Views
----------------
Views for Menu App.
"""
from django.views.generic import TemplateView
from django.shortcuts import render


class Menu(TemplateView):
    """
    A view to render menu page
    """

    template_name = "menu.html"
  
