from rest_framework import serializers
from django.contrib.auth.models import User


class UserprofileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class RegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username',
                  'email', 'password', 'password2']
        extra_kwargs = {
            'password': {
                'write_only': True,
                "style": {
                    'input_type': 'password'
                }
            }
        }

    def save(self):
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError(
                {'error': "Password doesn't match."})

        if User.objects.filter(email=self.validated_data['email']).exists():
            raise serializers.ValidationError(
                {'error': 'Email already exists.'})

        if User.objects.filter(username=self.validated_data['username']).exists():
            raise serializers.ValidationError(
                {'error': 'Username already exists.'})

        user = User(first_name=self.validated_data['first_name'], last_name=self.validated_data['last_name'],
                    username=self.validated_data['username'], email=self.validated_data['email'])
        user.set_password(password)
        user.save()

        return user
