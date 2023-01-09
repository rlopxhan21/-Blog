from django.urls import path

from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterAPI, LogoutAPI, MyTokenObtainPairView, UserList, UserDetail
urlpatterns = [
    path('register/', RegisterAPI.as_view(), name='register'),
    path('login/', MyTokenObtainPairView.as_view(), name='login'),
    path('refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('logout/', LogoutAPI.as_view(), name='logout'),

    path('userprofile/', UserList.as_view(), name='user-profile'),
    path('userprofile/<int:pk>/', UserDetail.as_view(), name='user-detail'),


]
