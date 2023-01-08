from rest_framework.response import Response
from rest_framework import mixins, generics, status
from forumapp.permissions import OwnerorReadOnly
from rest_framework.permissions import IsAuthenticatedOrReadOnly


from .models import BlogRoom, Blog, Comment, Upvote, Downvote
from .serializers import BlogRoomSerializers, BlogSerializers, CommentSerializers, UpvoteSerializers, DownvoteSerializers


class BlogRoomList(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = BlogRoom.actives.all()
    serializer_class = BlogRoomSerializers

    def perform_create(self, serializer):
        serializer.save(author_id=self.request.user.id)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class BlogRoomDetail(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = BlogRoom.actives.all()
    serializer_class = BlogRoomSerializers
    permission_classes = [OwnerorReadOnly]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class BlogList(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = Blog.actives.all()
    serializer_class = BlogSerializers

    def perform_create(self, serializer):
        serializer.save(author_id=self.request.user.id)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class BlogDetail(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = Blog.actives.all()
    serializer_class = BlogSerializers
    permission_classes = [OwnerorReadOnly]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class CommentList(mixins.ListModelMixin, generics.GenericAPIView):
    serializer_class = CommentSerializers
    queryset = Comment.objects.all()

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class CommentCreate(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    serializer_class = CommentSerializers

    def get_queryset(self, *args, **kwargs):
        pk = self.kwargs['pk']
        return Comment.actives.filter(blog_id=pk)

    def perform_create(self, serializer):
        pk = self.kwargs['pk']
        serializer.save(blog_id=pk, author_id=self.request.user.id)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class CommentDetail(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = Comment.actives.all()
    serializer_class = CommentSerializers
    permission_classes = [OwnerorReadOnly]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class UpvoteList(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    serializer_class = UpvoteSerializers
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self, *args, **kwargs):
        pk = self.kwargs['pk']
        return Upvote.objects.filter(blog_id=pk)

    def perform_create(self, serializer):
        pk = self.kwargs['pk']
        serializer.save(blog_id=pk, author_id=self.request.user.id)

    def create(self, request, *args, **kwrgs):
        pk = self.kwargs['pk']

        if Downvote.objects.filter(author_id=self.request.user.id, blog_id=pk).exists():
            ItemToDelete = Downvote.objects.get(
                author_id=self.request.user.id, blog_id=pk)
            ItemToDelete.delete()

        if Upvote.objects.filter(author_id=self.request.user.id, blog_id=pk).exists():
            ItemToDelete = Upvote.objects.get(
                author_id=self.request.user.id, blog_id=pk)
            ItemToDelete.delete()
            return Response("Upvote already exists, so it is deleted!", status=status.HTTP_204_NO_CONTENT)

        else:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class DownvoteList(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    serializer_class = DownvoteSerializers
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self, *args, **kwargs):
        pk = self.kwargs['pk']
        return Downvote.objects.filter(blog_id=pk)

    def perform_create(self, serializer):
        pk = self.kwargs['pk']
        serializer.save(blog_id=pk, author_id=self.request.user.id)

    def create(self, request, *args, **kwrgs):
        pk = self.kwargs['pk']

        if Upvote.objects.filter(author_id=self.request.user.id, blog_id=pk).exists():
            ItemToDelete = Upvote.objects.get(
                author_id=self.request.user.id, blog_id=pk)
            ItemToDelete.delete()

        if Downvote.objects.filter(author_id=self.request.user.id, blog_id=pk).exists():
            ItemToDelete = Downvote.objects.get(
                author_id=self.request.user.id, blog_id=pk)
            ItemToDelete.delete()
            return Response("Downvote already exists, so it is deleted!", status=status.HTTP_204_NO_CONTENT)

        else:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
