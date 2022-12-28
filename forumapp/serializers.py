from rest_framework import serializers

from .models import Room, Post, Comment


class CommentSerializers(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Comment
        exclude = ['post']


class PostSerializers(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    post_comment = CommentSerializers(many=True, read_only=True)
    author_name = serializers.CharField(
        source='author.username', read_only=True)

    class Meta:
        model = Post
        exclude = ['active']


class RoomSerializers(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    room_post = PostSerializers(many=True, read_only=True)

    class Meta:
        model = Room
        exclude = ['active']
