"""
Home App - Views
----------------
Views for Home App
"""

from django.shortcuts import render
from django.views.generic import TemplateView


class Home(TemplateView):
    template_name = "index.html"



