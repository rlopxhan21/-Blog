from django.contrib.auth.models import AbstractUser
from django.db import models


class UserProfile(models.Model):
    profile_picture = models.ImageField(
        null=True, default="images/default.png")
