from django.shortcuts import render


def bookingsystem_list(request):
    return render(request, 'bookingsystem/bookingsystem_list.html')
