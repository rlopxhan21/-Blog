from rest_framework import serializers

from .models import BlogRoom, Blog, Comment


class CommentSerializers(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    author_fname = serializers.CharField(
        source='author.first_name', read_only=True)
    author_lname = serializers.CharField(
        source='author.last_name', read_only=True)

    class Meta:
        model = Comment
        exclude = ['blog']


class BlogSerializers(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    blog_comment = CommentSerializers(many=True, read_only=True)
    author_fname = serializers.CharField(
        source='author.first_name', read_only=True)
    author_lname = serializers.CharField(
        source='author.last_name', read_only=True)
    blogroom_name = serializers.CharField(
        source='blogroom.name', read_only=True)

    class Meta:
        model = Blog
        exclude = ['active']


class BlogRoomSerializers(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    blogroom_blog = BlogSerializers(many=True, read_only=True)

    class Meta:
        model = BlogRoom
        exclude = ['active']