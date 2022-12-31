from django.urls import path

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterAPI, LogoutAPI, UserprofileAPI

urlpatterns = [
    path('register/', RegisterAPI.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('userprofile/', UserprofileAPI.as_view(), name='userprofile'),
    path('logout/', LogoutAPI.as_view(), name='logout'),
]