"""
Reviews App - Admin
----------------
Admin Configuration for Reviews App.
"""
from django.contrib import admin
from reviews.models import Review


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = (
        "author",
        "review_text",
        "date_created_on",
    )
    list_filter = (
        "date_created_on",
    )
