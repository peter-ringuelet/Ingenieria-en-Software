# api/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Restaurant, MenuItem, Review
from django.db.models import Avg

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

from rest_framework.fields import SerializerMethodField

class RestaurantSerializer(serializers.ModelSerializer):
    menu_items = MenuItemSerializer(many=True, read_only=True)
    visited = SerializerMethodField()
    rating = SerializerMethodField()

    class Meta:
        model = Restaurant
        fields = [
            'id', 'name', 'latitude', 'longitude', 'specialty', 'hours',
            'phone', 'visited', 'rating', 'menu_items'
        ]

    def get_visited(self, obj):
        """
        Devuelve True si el usuario autenticado tiene al menos una reseña
        para este restaurante; de lo contrario, False.
        """
        user = self.context['request'].user
        if user.is_authenticated:
            return obj.reviews.filter(user=user).exists()
        return False

    def get_rating(self, obj):
        """
        Calcula el promedio de estrellas basado únicamente en las reseñas
        del usuario autenticado para este restaurante.
        """
        user = self.context['request'].user
        if user.is_authenticated:
            averages = obj.reviews.filter(user=user).aggregate(
                avg_comida=Avg('comida'),
                avg_abundancia=Avg('abundancia'),
                avg_sabor=Avg('sabor'),
                avg_calidadPrecio=Avg('calidadPrecio'),
                avg_limpieza=Avg('limpieza'),
                avg_atencion=Avg('atencion'),
                avg_ambiente=Avg('ambiente')
            )

            total = sum(filter(None, averages.values()))  # Ignorar valores None
            count = len([v for v in averages.values() if v is not None])  # Contar solo valores no None

            if total and count:
                average_rating = total / count
                return round(average_rating * 2) / 2  # Redondear al 0.5 más cercano
        return 0.0

class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    restaurant_name = serializers.ReadOnlyField(source='restaurant.name')  # Extrae el nombre del restaurante

    class Meta:
        model = Review
        fields = [
            'id', 'restaurant', 'restaurant_name', 'user', 'comida', 
            'abundancia', 'sabor', 'calidadPrecio', 'limpieza', 
            'atencion', 'ambiente', 'created_at'
        ]


from django.contrib.auth.models import User
from rest_framework import serializers

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
