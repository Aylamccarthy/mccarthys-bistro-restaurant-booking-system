"""
Home App - Views
----------------
Views for Home App
"""

from django.shortcuts import render
from django.views import View


class Home(View):
    template_name = "index.html"
