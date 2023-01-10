from django.db import models
from django.utils.text import slugify

from useraccount.models import User
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
    title = models.CharField(max_length=1024)
    content = RichTextField()
    blogroom = models.ForeignKey(
        BlogRoom, on_delete=models.CASCADE, related_name='blogroom_blog')
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='author_blog')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=False)

    objects = models.Manager()
    actives = ActiveManager()

    class Meta:
        ordering = ['-created', '-updated']
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
        Blog, on_delete=models.CASCADE, related_name='blog_blogcomment')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
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


class Upvote(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE,
                             related_name='upvoted_blog')
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='authorblog_upvote')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.author.first_name} {self.author.last_name} upvoted {self.blog.content[:50]}'


class Downvote(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE,
                             related_name='downvoted_blog')
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='authorblog_downvote')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.author.first_name} {self.author.last_name} downvoted {self.blog.content[:50]}'
