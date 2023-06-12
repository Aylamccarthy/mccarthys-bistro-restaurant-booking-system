from django.shortcuts import render


def make_booking(request):
    return render(request, 'bookings/make_booking.html')
