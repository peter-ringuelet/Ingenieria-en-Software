# api/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Restaurant, MenuItem, Review

class UserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=False, allow_blank=True)
    last_name = serializers.CharField(required=False, allow_blank=True)
    email = serializers.EmailField()
    username = serializers.CharField(read_only=True)  # Marcar como de solo lectura

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name']
        # Alternativamente, puedes usar 'read_only_fields'
        # read_only_fields = ['username']

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = ['avatar', 'user', 'phone']
    
    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        user = instance.user

        # Actualizar campos del usuario
        user.first_name = user_data.get('first_name', user.first_name)
        user.last_name = user_data.get('last_name', user.last_name)
        user.email = user_data.get('email', user.email)
        user.save()

        # Actualizar campos del perfil
        instance.avatar = validated_data.get('avatar', instance.avatar)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.save()

        return instance

# Serializadores para MenuItem, Restaurant y Review permanecen sin cambios

class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = ['id', 'category', 'name', 'price']

class RestaurantSerializer(serializers.ModelSerializer):
    menu_items = MenuItemSerializer(many=True, read_only=True)

    class Meta:
        model = Restaurant
        fields = [
            'id', 'name', 'latitude', 'longitude', 'specialty', 'hours',
            'phone', 'visited', 'rating', 'menu_items'
        ]
        read_only_fields = ['rating', 'visited']  # Opcional: Hacer estos campos de solo lectura

class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Review
        fields = [
            'id', 'restaurant', 'user', 'comida', 'abundancia', 'sabor',
            'calidadPrecio', 'limpieza', 'atencion', 'ambiente', 'created_at'
        ]
