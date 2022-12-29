from django.db import models
from django.utils.text import slugify

from django.contrib.auth.models import User
from ckeditor.fields import RichTextField


class ActiveManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(active=True)


class BlogRoom(models.Model):
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


class Blog(models.Model):
    title = models.CharField(max_length=1024);
    content = RichTextField()
    blogroom = models.ManyToManyField(
        BlogRoom, related_name='blogroom_blog')
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='author_blog')
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
        return self.content[:50]


class Comment(models.Model):
    content = models.TextField()
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='author_blogcomment')
    blog = models.ForeignKey(
        Blog, on_delete=models.CASCADE, related_name='post_blogcomment')
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
