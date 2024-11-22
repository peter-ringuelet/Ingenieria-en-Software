# api/views.py

from rest_framework import generics, permissions, viewsets
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Avg
from .models import Profile, Restaurant, Review
from .serializers import UserSerializer, ProfileSerializer, RestaurantSerializer, ReviewSerializer, RegisterSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': UserSerializer(user).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })


class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [JSONParser]

    def get_object(self):
        return self.request.user.profile

class RestaurantViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.none()  # Define un queryset vacío
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        """
        Devuelve solo las reseñas del usuario autenticado.
        Si el usuario no está autenticado, devuelve un conjunto vacío.
        """
        if self.request.user.is_authenticated:
            return Review.objects.filter(user=self.request.user).order_by('-created_at')
        return Review.objects.none()

    def perform_create(self, serializer):
        # Guardar la reseña con el usuario actual
        review = serializer.save(user=self.request.user)
        restaurant = review.restaurant

        # Si el restaurante no ha sido visitado, actualizarlo
        if not restaurant.visited:
            restaurant.visited = True
            restaurant.save()

        # Calcular el promedio de todas las estrellas de todas las reseñas del restaurante
        averages = restaurant.reviews.aggregate(
            avg_comida=Avg('comida'),
            avg_abundancia=Avg('abundancia'),
            avg_sabor=Avg('sabor'),
            avg_calidadPrecio=Avg('calidadPrecio'),
            avg_limpieza=Avg('limpieza'),
            avg_atencion=Avg('atencion'),
            avg_ambiente=Avg('ambiente')
        )

        # Calcular el promedio general
        total = (
            averages['avg_comida'] +
            averages['avg_abundancia'] +
            averages['avg_sabor'] +
            averages['avg_calidadPrecio'] +
            averages['avg_limpieza'] +
            averages['avg_atencion'] +
            averages['avg_ambiente']
        )
        count = 7  # Número de atributos de calificación

        if total and count:
            average_rating = total / count
            # Redondear al 0.5 más cercano
            rounded_rating = round(average_rating * 2) / 2
            restaurant.rating = rounded_rating
            restaurant.save()
