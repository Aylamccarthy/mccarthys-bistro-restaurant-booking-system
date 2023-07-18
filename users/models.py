"""
Users App - Models
----------------
Models for Users App.
"""
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models


class User(AbstractBaseUser):
    email = models.EmailField(verbose_name='email address', unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False)
    admin = models.BooleanField(default=False)

    # USERNAME_FIELD = 'email'

    @property
    def is_active(self):
        return self.active 

    def has_perm(self, perm, obj=None):
        return self.staff

    def has_module_perms(self, app_label):
        return self.staff
