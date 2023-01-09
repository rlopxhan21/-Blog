from django.contrib.auth.models import User
from django.db import models
from PIL import Image


class UserProfile(models.Model):
    author = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(
        null=True, default="default.jpg", blank=True)

    def __str__(self):
        return f"{self.author.username} uplooaded a new profile picture."

    def save(self):
        super().save()

        img = Image.open(self.image.path)

        if img.height > 300 or img.width > 300:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.image.path)
