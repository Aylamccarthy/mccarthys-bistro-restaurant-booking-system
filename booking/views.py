from django.views import generic
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from .models import Booking, Table
from .forms import BookingForm
from django.views.generic import DeleteView, CreateView, UpdateView, ListView
from django.contrib import messages


class CreateBookingView(LoginRequiredMixin, generic.CreateView):
    """
    View to render createbookings
    and allow user to create a booking
    """

    form_class = BookingForm
    template_name = "booking/booking.html"
    success_url = "/booking/createbooking"
    model = Booking

    def form_valid(self, form):
        form.instance.customer = self.request.user
        date = form.cleaned_data["booking_date"]
        time = form.cleaned_data["booking_time"]
        guests = form.cleaned_data["number_of_guests"]
        tables_with_capacity = list(Table.objects.filter(capacity__gte=guests))
        bookings_on_requested_date = Booking.objects.filter(
            booking_date=date, booking_time=time
        )

        for booking in bookings_on_requested_date:
            for table in tables_with_capacity:
                if table.table_number == booking.booked_table.table_number:
                    tables_with_capacity.remove(table)
                    break
        print(f"Available Tables with capacity: {tables_with_capacity}")

        lowest_capacity_table = tables_with_capacity[0]
        for table in tables_with_capacity:
            if table.capacity < lowest_capacity_table.capacity:
                lowest_capacity_table = table
        print(f"lowest_capacity_table is : {lowest_capacity_table}")
        form.instance.booked_table = lowest_capacity_table

        messages.success(
            self.request, f"Booking confirmed for {guests} guests on {date}"
        )

        return super(CreateBookingView, self).form_valid(form)


class BookingsList(LoginRequiredMixin, generic.ListView):
    """
    View to render ManageBookings
    """

    model = Booking
    template_name = "booking/managebookings.html"

    def get_queryset(self):
        if self.request.user.is_staff:
            return Booking.objects.all()
        else:
            return Booking.objects.filter(customer=self.request.user)


class EditBookingView(LoginRequiredMixin,
                      UserPassesTestMixin, generic.UpdateView):
    """
    A view to provide a Form to the user
    to edit a booking
    """

    form_class = BookingForm
    template_name = "booking/edit_booking.html"
    success_url = "/booking/managebookings"
    model = Booking

    def form_valid(self, form):
        date = form.cleaned_data["booking_date"]
        time = form.cleaned_data["booking_time"]
        guests = form.cleaned_data["number_of_guests"]
        tables_with_capacity = list(Table.objects.filter(capacity__gte=guests))
        bookings_on_requested_date = Booking.objects.filter(
            booking_date=date, booking_time=time
        )
        for booking in bookings_on_requested_date:
            for table in tables_with_capacity:
                if table.table_number == booking.booked_table.table_number:
                    tables_with_capacity.remove(table)
                    break
        if tables_with_capacity:
            lowest_capacity_table = tables_with_capacity[0]
            for table in tables_with_capacity:
                if table.capacity < lowest_capacity_table.capacity:
                    lowest_capacity_table = table
            form.instance.booked_table = lowest_capacity_table

        messages.success(
            self.request,
            f"Successfully updated booking for {guests} guests on {date}"
        )

        return super(EditBookingView, self).form_valid(form)

    def test_func(self):
        if self.request.user.is_staff:
            return True
        else:
            return self.request.user == self.get_object().customer


class DeleteBookingView(LoginRequiredMixin,
                        UserPassesTestMixin, generic.DeleteView):
    """A view to delete a booking"""

    model = Booking
    template_name = "booking/delete_booking.html"
    success_url = "/booking/managebookings"

    def form_valid(self, form):
        """Display toast message on form success"""
        messages.success(self.request, "Successfully deleted booking")
        return super(DeleteBookingView, self).form_valid(form)

    def test_func(self):
        if self.request.user.is_staff:
            return True
        else:
            return self.request.user == self.get_object().customer
