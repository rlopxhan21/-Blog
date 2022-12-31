from django.contrib import admin
from .models import Room, Post, Comment


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'author', 'active']
    list_filter = ['active']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    raw_id_fields = ['author']


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['content', 'author',
                    'created', 'updated', 'active']
    list_filter = ['active', 'updated']
    search_fields = ['content']
    raw_id_fields = ['author']


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['content', 'author', 'post',
                    'created', 'updated', 'active']
    list_filter = ['active', 'updated']
    search_fields = ['content', 'post']
    raw_id_fields = ['author']
