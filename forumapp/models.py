from django.db import models
from django.utils.text import slugify

from django.contrib.auth.models import User


class ActiveManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(active=True)


class Room(models.Model):
    name = models.CharField(max_length=64)
    slug = models.SlugField(null=True, blank=True)
    description = models.CharField(max_length=1024)
    author = models.ForeignKey(
        User, on_delete=models.SET('AUTHOR NOT AVAILABLE'))
    active = models.BooleanField(default=True)

    objects = models.Manager()
    actives = ActiveManager()

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Post(models.Model):
    content = models.TextField()
    room = models.ManyToManyField(
        Room, related_name='room_post')
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='author_post')
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    active = models.BooleanField(default=True)

    objects = models.Manager()
    actives = ActiveManager()

    class Meta:
        ordering = ['updated']
        indexes = [
            models.Index(fields=['-updated'])
        ]

    def __str__(self):
        return self.content[:50]


class Comment(models.Model):
    content = models.TextField()
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='author_comment')
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='post_comment')
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    active = models.BooleanField(default=True)

    objects = models.Manager()
    actives = ActiveManager()

    class Meta:
        ordering = ['-updated']
        indexes = [
            models.Index(fields=['-updated'])
        ]

    def __str__(self):
        return self.content[: 50]
