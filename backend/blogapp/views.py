from rest_framework.response import Response
from rest_framework import mixins, generics, status
from .pagination import StandardPagination


from .models import BlogRoom, Blog, Comment, Upvote, Downvote
from .serializers import BlogRoomSerializers, BlogSerializers, CommentSerializers, UpvoteSerializers, DownvoteSerializers


class BlogRoomList(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = BlogRoom.actives.all()
    serializer_class = BlogRoomSerializers
    # pagination_class = StandardPagination

    def perform_create(self, serializer):
        serializer.save(author_id=self.request.user.id)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class BlogRoomDetail(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = BlogRoom.actives.all()
    serializer_class = BlogRoomSerializers

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

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class UpvoteList(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    serializer_class = UpvoteSerializers

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

        if not Upvote.objects.filter(author_id=self.request.user.id, blog_id=pk).exists():
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

        else:
            return Response("Upvote already exists!", status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class UpvoteDelete(mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = Upvote.objects.all()
    serializer_class = UpvoteSerializers
    # permission_classes = []

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class DownvoteList(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    serializer_class = DownvoteSerializers

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

        if not Downvote.objects.filter(author_id=self.request.user.id, blog_id=pk).exists():
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

        else:
            return Response("Downvote already exists!", status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class DownvoteDelete(mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = Downvote.objects.all()
    serializer_class = DownvoteSerializers
    # permission_classes = []

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
