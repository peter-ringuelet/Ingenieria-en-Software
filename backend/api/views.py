# api/views.py

from rest_framework import generics, permissions, viewsets
from rest_framework.parsers import JSONParser, FormParser, MultiPartParser
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Profile, Restaurant, Review
from .serializers import UserSerializer, ProfileSerializer, RestaurantSerializer, ReviewSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        if username and email and password:
            user = User.objects.create_user(username=username, email=email, password=password)
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': UserSerializer(user).data,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        else:
            return Response({'error': 'Faltan campos requeridos.'}, status=400)

class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer  # Cambiado a ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [JSONParser]  # Aceptamos solo JSON

    def get_object(self):
        return self.request.user.profile

class RestaurantViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
