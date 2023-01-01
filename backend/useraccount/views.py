from .serializers import RegistrationSerializer, UserprofileSerializer

from django.contrib.auth.models import User
from rest_framework import generics, mixins, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['fname'] = user.first_name
        token['lname'] = user.last_name

        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UserprofileAPI(mixins.ListModelMixin, generics.GenericAPIView):
    serializer_class = UserprofileSerializer
    queryset = User.objects.all()

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, *kwargs)


class RegisterAPI(mixins.CreateModelMixin, generics.GenericAPIView):
    serializer_class = RegistrationSerializer
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            refresh = RefreshToken.for_user(user)

            response_data = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }

            return Response(response_data, status=status.HTTP_201_CREATED)

        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)


class LogoutAPI(mixins.CreateModelMixin, generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data.get('refresh_token')
            token_obj = RefreshToken(refresh_token)
            token_obj.blacklist()

            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
