from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from .forms import ProfileForm
from .models import Profile
from django.contrib import messages
from django.contrib.auth.decorators import login_required


def profile(request):
    """View to display the user profile"""
    user_profile = request.user.profile
    return render(request, 'profile.html', {'profile': user_profile})


def update_profile(request):
    """View to handle profile update"""
    profile = request.user.profile
    if request.method == 'POST':
        form = ProfileForm(request.POST, request.FILES, instance=profile)
        if form.is_valid():
            form.save()
            messages.success(request, 'Your profile has been updated successfully')
            return redirect('profile')
    else:
        form = ProfileForm(instance=profile)

    return render(request, 'profile.html', {'form': form})


@login_required
def delete_profile(request):
    """View to handle profile deletion"""
    if request.method == 'POST':
        request.user.delete()
        messages.success(request, 'Your profile has been successfully deleted.')
        return redirect('home')