from django.urls import path

from .views import BlogRoomList, BlogRoomDetail, BlogList, BlogDetail, CommentList, CommentDetail

app_name = 'blogapp'

urlpatterns = [
    path('blogroom/', BlogRoomList.as_view(), name='blogroom-list'),
    path('blogroom/<int:pk>/<slug:slug>/',
         BlogRoomDetail.as_view(), name='blogroom-detail'),

    path('blog/', BlogList.as_view(), name='blog-list'),
    path('blog/<int:pk>/', BlogDetail.as_view(), name='blog-detail'),

    path('blog/<int:pk>/comment/', CommentList.as_view(), name='room-list'),
    path('blog/comment/<int:pk>/',
         CommentDetail.as_view(), name='room-detail'),
]
