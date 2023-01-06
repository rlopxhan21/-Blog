from django.contrib import admin
from .models import BlogRoom, Blog, Comment, Upvote, Downvote
from ckeditor.widgets import CKEditorWidget


@admin.register(BlogRoom)
class BlogRoomAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'author', 'active']
    list_filter = ['active']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    raw_id_fields = ['author']


@admin.register(Blog)
class PostAdmin(admin.ModelAdmin):
    formfield_overrides = {
        Blog.content: {'widget': CKEditorWidget},
    }
    list_display = ['content', 'author',
                    'created', 'updated', 'active']
    list_filter = ['active', 'updated']
    search_fields = ['content']
    raw_id_fields = ['author']


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['content', 'author', 'blog',
                    'created', 'updated', 'active']
    list_filter = ['active', 'updated']
    search_fields = ['content', 'post']
    raw_id_fields = ['author']


admin.site.register(Upvote)
admin.site.register(Downvote)
