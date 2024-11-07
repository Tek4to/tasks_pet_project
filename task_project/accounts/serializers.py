from rest_framework import serializers
from accounts.models import CustomUser  # Импортируйте кастомную модель пользователя

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser  # Указываем кастомную модель пользователя
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
