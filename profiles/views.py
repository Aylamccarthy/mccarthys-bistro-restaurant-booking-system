from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from .forms import ProfileForm
from django.db.models.signals import post_save
from django.dispatch import receiver


def update_profile(request):
    """View to handle profile update"""
    if request.method == "POST":
        form = ProfileForm(request.POST, request.FILES, instance=request.user)
        if form.is_valid():
            form.save()
            return redirect("profile")
    else:
        form = ProfileForm(instance=request.user)

    return render(request, "profile.html", {"form": form})


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
