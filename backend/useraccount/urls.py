from django.urls import path

from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterAPI, LogoutAPI, UserprofileAPI, MyTokenObtainPairView, GetUserAPI, UserDetailAPI

urlpatterns = [
    path('register/', RegisterAPI.as_view(), name='register'),
    path('login/', MyTokenObtainPairView.as_view(), name='login'),
    path('refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('userprofile/', UserprofileAPI.as_view(), name='userprofile'),
    path('logout/', LogoutAPI.as_view(), name='logout'),

    path('profiles/', GetUserAPI.as_view(), name='profiles'),
    path('profiles/<int:pk>/', UserDetailAPI.as_view(), name='user-details')
]
