from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    author = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.author
