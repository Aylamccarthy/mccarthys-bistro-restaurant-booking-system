"""
Reviews App - Views
----------------
Views for Reviews App.
"""
from datetime import datetime
from django.shortcuts import render, get_object_or_404, redirect
from django.views.generic import ListView
from django.contrib import messages
from django.http import HttpResponseRedirect
from django.views.generic.edit import UpdateView
from django.contrib.auth.mixins import UserPassesTestMixin
from reviews.forms import ReviewForm
from .models import User
from .models import Review as ReviewModel


class Review(ListView):
    """
    A view that provides the list of reviews and also
    a form for creating Review entries
    """

    template_name = "reviews.html"
    model = ReviewModel
    form_class = ReviewForm
    context_object_name = "review_list"
    paginate_by = 4

    def get_queryset(self):
        return ReviewModel.objects.order_by('-date_updated_on')

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)
        context['review_form'] = ReviewForm
        # context['update_review_form'] = UpdateReviewForm (have yet to do this view)
        context['reviews'] = ReviewModel.objects.all()
        context['users'] = User.objects.all()
        return context

    def post(self, request):
        """Override post method"""
        if request.method == 'POST':

            review_form = ReviewForm(data=request.POST)

            if review_form.is_valid():
                rate = review_form.cleaned_data['rate']
                if rate:
                    rate_value = rate
                else:
                    rate_value = 1
                text = review_form.cleaned_data['review_text']
                user = request.user
                now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                review = ReviewModel(rate=rate_value, review_text=text,
                                     date_created_on=now, date_updated_on=now,
                                     author=user, )
                review.save()
                messages.success(
                    request, 'Your review was successfully added to the list')
                return HttpResponseRedirect('/reviews')

            messages.error(
                request,
                'There was a problem submiting your review.' +
                'Please try again!')
            return HttpResponseRedirect('/reviews')
        update_review_form = UpdateReviewForm(request.GET)
        review_form = ReviewForm(request.GET)
        return render(
            request, 'reviews.html',
            {'review_form': review_form,
             'update_review_form': update_review_form, })