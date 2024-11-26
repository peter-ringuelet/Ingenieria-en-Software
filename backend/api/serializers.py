# api/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Restaurant, MenuItem, Review
from django.db.models import Avg

# api/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class UserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=False, allow_blank=True)
    last_name = serializers.CharField(required=False, allow_blank=True)
    email = serializers.EmailField()
    username = serializers.CharField(read_only=True)  # Marcar como de solo lectura

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name']

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    avatar = serializers.ImageField(required=False, allow_null=True)
    avatar_url = serializers.SerializerMethodField()  # Nuevo campo

    class Meta:
        model = Profile
        fields = ['avatar', 'avatar_url', 'user', 'phone']

    def get_avatar_url(self, obj):
        request = self.context.get('request')
        if obj.avatar and hasattr(obj.avatar, 'url'):
            return request.build_absolute_uri(obj.avatar.url)
        return None

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        user = instance.user

        # Actualizar campos del usuario
        user.first_name = user_data.get('first_name', user.first_name)
        user.last_name = user_data.get('last_name', user.last_name)
        user.email = user_data.get('email', user.email)
        user.save()

        # Actualizar el avatar si se proporciona
        avatar = validated_data.get('avatar', None)
        if avatar:
            if instance.avatar:
                instance.avatar.delete()  # Eliminar avatar anterior
            instance.avatar = avatar

        # Actualizar otros campos del perfil
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

from django.contrib.auth.models import User
from rest_framework import serializers

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {
            'username': {'validators': []},  # Elimina las validaciones automáticas de Django
        }

    def validate_username(self, value):
        # Validación manual de unicidad para username
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("El nombre de usuario ya está en uso. Por favor, elige otro.")
        return value

    def validate_email(self, value):
        # Validación manual de unicidad para email
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("El correo electrónico ya está registrado. Inténtalo con otro.")
        return value

    def create(self, validated_data):
        # Crear el usuario con datos validados
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

# api/views.py

from rest_framework import generics, permissions
from rest_framework.parsers import MultiPartParser, JSONParser
from .serializers import ProfileSerializer

class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, JSONParser]

    def get_object(self):
        return self.request.user.profile

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
