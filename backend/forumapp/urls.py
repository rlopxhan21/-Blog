from django.urls import path

from .views import RoomList, RoomDetail, PostList, PostDetail, CommentList, CommentCreate, CommentDetail, UpvoteList, DownvoteList

app_name = 'forumapp'

urlpatterns = [
    path('room/', RoomList.as_view(), name='room-list'),
    path('room/<int:pk>/', RoomDetail.as_view(), name='room-detail'),

    path('post/', PostList.as_view(), name='room-list'),
    path('post/<int:pk>/', PostDetail.as_view(), name='room-detail'),

    path('post/comment/', CommentList.as_view(), name='comment-list'),
    path('post/<int:pk>/comment/', CommentCreate.as_view(), name='comment-create'),
    path('post/comment/<int:pk>/',
         CommentDetail.as_view(), name='comment-detail'),

    path('post/<int:pk>/upvote/', UpvoteList.as_view(), name='upvote-list'),
    path('post/<int:pk>/downvote/', DownvoteList.as_view(), name='downvote-list'),

]
