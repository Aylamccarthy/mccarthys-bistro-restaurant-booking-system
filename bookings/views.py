from django.views.generic import TemplateView
from .forms import newBookingForm
from django.shortcuts import render
from .models import Booking 
from django.views.generic.edit import FormView


class Booking(TemplateView):
    template_name = "bookings.html"

    def get_context_data(self, *args, **kwargs):
        context = super(Booking, self).get_context_data(*args, **kwargs)
        context['form'] = newBookingForm()
        return context
