"""
Home App - Views
----------------
Views for Home App
"""

from django.shortcuts import render
from django.views.generic import TemplateView


class Home(TemplateView):
    """
    View to render homepage
    """
    template_name = "home/index.html"


