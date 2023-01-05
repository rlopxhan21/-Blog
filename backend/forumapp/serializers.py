from rest_framework import serializers

from .models import Room, Post, Comment, Upvote


class UpvoteSerializers(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    post = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Upvote
        fields = ["author", 'post']


class CommentSerializers(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)

    author_fname = serializers.CharField(
        source='author.first_name', read_only=True)
    author_lname = serializers.CharField(
        source='author.last_name', read_only=True)

    class Meta:
        model = Comment
        exclude = ['post']


class PostSerializers(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    upvoted_post = UpvoteSerializers(many=True, read_only=True)
    post_comment = CommentSerializers(many=True, read_only=True)
    author_fname = serializers.CharField(
        source='author.first_name', read_only=True)
    author_lname = serializers.CharField(
        source='author.last_name', read_only=True)

    class Meta:
        model = Post
        exclude = ['active']


class RoomSerializers(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    room_post = PostSerializers(many=True, read_only=True)

    class Meta:
        model = Room
        exclude = ['active']
