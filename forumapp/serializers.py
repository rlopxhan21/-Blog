from rest_framework import serializers

from .models import Room, Post, Comment


class CommentSerializers(serializers.ModelSerializer):
    class Meta:
        model = Comment
        exclude = ['post']


class PostSerializers(serializers.ModelSerializer):
    post_comment = CommentSerializers(many=True, read_only=True)
    author_name = serializers.CharField(
        source='author.username', read_only=True)

    class Meta:
        model = Post
        exclude = ['active']


class RoomSerializers(serializers.ModelSerializer):
    room_post = PostSerializers(many=True, read_only=True)

    class Meta:
        model = Room
        exclude = ['active']
