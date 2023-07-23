"""
Menu App - Views
----------------
Views for Menu App.
"""
from django.views.generic import ListView
from django.shortcuts import render
from .models import Menu


class MenuListView(ListView):
    """ View menu list """
    model = Menu
    template_name = 'menu.html'
