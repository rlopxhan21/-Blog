from django.urls import path

from .views import BlogRoomList, BlogRoomDetail, BlogList, BlogDetail, CommentList, CommentCreate, CommentDetail, UpvoteList, UpvoteDelete, DownvoteList, DownvoteDelete

app_name = 'blogapp'

urlpatterns = [
    path('blogroom/', BlogRoomList.as_view(), name='blogroom-list'),
    path('blogroom/<int:pk>/<slug:slug>/',
         BlogRoomDetail.as_view(), name='blogroom-detail'),

    path('blog/', BlogList.as_view(), name='blog-list'),
    path('blog/<int:pk>/', BlogDetail.as_view(), name='blog-detail'),

    path('blog/comment/', CommentList.as_view(), name='comment-list'),
    path('blog/<int:pk>/comment/', CommentCreate.as_view(), name='comment-create'),
    path('blog/comment/<int:pk>/',
         CommentDetail.as_view(), name='comment-detail'),


    path('blog/<int:pk>/upvote/', UpvoteList.as_view(), name='upvote-list'),
    path('blog/upvote/<int:pk>/', UpvoteDelete.as_view(), name='upvote-delete'),

    path('blog/<int:pk>/downvote/', DownvoteList.as_view(), name='downvote-list'),
    path('blog/downvote/<int:pk>/',
         DownvoteDelete.as_view(), name='downvote-delete'),
]
