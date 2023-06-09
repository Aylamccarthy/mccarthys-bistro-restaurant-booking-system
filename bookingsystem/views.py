from django.shortcuts import render


def bookingsytem_list(request):
    return render(request, 'bookingsystem/bookingsytem_list.html')
