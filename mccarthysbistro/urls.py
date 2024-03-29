"""mccarthysbistro URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from allauth.account.views import login, signup, logout
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('home.urls'), name='home-urls'),
    path('booking/', include('booking.urls'), name='booking'),
    path('accounts/signup/', signup, name='account_signup'),
    path('accounts/login/', login, name='account_login'),
    path('accounts/logout/', logout, name='account_logout'),
    path('menu/', include('menu.urls'), name='menu'),
    path('contact/', include('contact.urls'), name='contact'),
    path('profiles/', include('profiles.urls'), name='profiles'),
    path('reviews/', include('reviews.urls'), name='reviews'),
]
