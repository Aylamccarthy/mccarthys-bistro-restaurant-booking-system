from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from .forms import ProfileForm
from .models import Profile


def Profile(request):
    """View to handle profile update"""
    if request.method == "POST":
        form = ProfileForm(request.POST, request.FILES, instance=request.user)
        if form.is_valid():
            form.save()
            messages.success(request, ('Your profile has been updated.'))
            return redirect("profile")
    else:
        form = ProfileForm(instance=request.user)

    return render(request, "profile.html", {"form": form})


# @receiver(post_save, sender=User)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created:
#         Profile.objects.create(user=instance)


# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
#     instance.profile.save()


# class EditProfile(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
#     """Edit a profile"""

#     form_class = ProfileForm
#     model = Profile

#     def form_valid(self, form):
#         self.success_url = f'/profiles/user/{self.kwargs["pk"]}/'
#         return super().form_valid(form)

#     def test_func(self):
#         return self.request.user == self.get_object().user