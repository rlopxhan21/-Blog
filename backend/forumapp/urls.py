from django.urls import path

from .views import RoomList, RoomDetail, PostList, PostDetail, CommentList, CommentDetail, UpvoteList, UpvoteDelete

app_name = 'forumapp'

urlpatterns = [
    path('room/', RoomList.as_view(), name='room-list'),
    path('room/<int:pk>/<slug:slug>/', RoomDetail.as_view(), name='room-detail'),

    path('post/', PostList.as_view(), name='room-list'),
    path('post/<int:pk>/', PostDetail.as_view(), name='room-detail'),

    path('post/<int:pk>/comment/', CommentList.as_view(), name='room-list'),
    path('post/comment/<int:pk>/',
         CommentDetail.as_view(), name='room-detail'),

    path('post/<int:pk>/upvote/', UpvoteList.as_view(), name='upvote-list'),
    path('post/upvote/<int:pk>/', UpvoteDelete.as_view(), name='upvote-delete'),
]
