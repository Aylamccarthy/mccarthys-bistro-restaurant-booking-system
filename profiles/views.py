from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from .forms import ProfileForm
from .models import Profile
from django.contrib import messages


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










# def Profile(request):
#     """View to handle profile update"""
#     if request.method == "POST":
#         form = ProfileForm(request.POST, request.FILES, instance=request.user)
#         if form.is_valid():
#             form.save()
#             messages.success(request, ('Your profile has been updated.'))
#             return redirect("profile")
#     else:
#         form = ProfileForm(instance=request.user)

#     return render(request, "profile.html", {"form": form})


# def update_profile(request):
#     if request.user.is_authenticated:
#         current_user = User.objects.get(id=request.user.id)
#         form = ProfileForm(request.POST or None, instance=current_user)
#         return render(request, "update_profile.html", {"form": form})
#     else:
#         messages.success(request, ("You must be logged in to view this page."))
#         return redirect('home')


