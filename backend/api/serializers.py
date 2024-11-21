# api/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Restaurant, MenuItem, Review

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name']

# Eliminamos PreferencesSerializer ya que no se utiliza
# class PreferencesSerializer(serializers.Serializer):
#     language = serializers.CharField(required=False, allow_blank=True)
#     timezone = serializers.CharField(required=False, allow_blank=True)

class ProfileSerializer(serializers.ModelSerializer):
    # Eliminamos preferences
    # preferences = PreferencesSerializer(required=False)
    name = serializers.CharField(source='user.get_full_name', read_only=True)
    email = serializers.EmailField(source='user.email')
    
    class Meta:
        model = Profile
        fields = ['avatar', 'name', 'email', 'phone']  # Eliminamos 'preferences'

    def update(self, instance, validated_data):
        # Actualizar campos del usuario
        user = instance.user
        user.email = validated_data.get('email', user.email)
        name = validated_data.get('name', '')
        if name:
            name_parts = name.split(' ')
            user.first_name = name_parts[0]
            user.last_name = ' '.join(name_parts[1:]) if len(name_parts) > 1 else ''
        user.save()
        
        # Actualizar campos del perfil
        instance.phone = validated_data.get('phone', instance.phone)
        instance.avatar = validated_data.get('avatar', instance.avatar)
        instance.save()
        
        return instance

# Los serializadores para MenuItem, Restaurant y Review permanecen sin cambios
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

class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Review
        fields = [
            'id', 'restaurant', 'user', 'comida', 'abundancia', 'sabor',
            'calidadPrecio', 'limpieza', 'atencion', 'ambiente', 'created_at'
        ]
