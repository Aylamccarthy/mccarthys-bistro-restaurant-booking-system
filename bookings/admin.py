"""
Bookings App - Admin
Admin configuration for Bookings App
"""

from django.contrib import admin

from .models import Booking, Table

# Register your models here.
admin.site.register(Booking)
admin.site.register(Table)
