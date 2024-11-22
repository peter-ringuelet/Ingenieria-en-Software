# api/models.py

from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)  # Cambiado a ImageField
    phone = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return self.user.username

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


# Otras clases de modelo (Restaurant, MenuItem, Review) permanecen sin cambios


# api/models.py

# api/models.py

class Restaurant(models.Model):
    name = models.CharField(max_length=100)
    latitude = models.FloatField(default=0.0)   # Agregar default=0.0
    longitude = models.FloatField(default=0.0)  # Agregar default=0.0
    specialty = models.CharField(max_length=100)
    hours = models.CharField(max_length=50)
    phone = models.CharField(max_length=20)
    visited = models.BooleanField(default=False)
    rating = models.FloatField(default=0.0)  # Cambiado de IntegerField a FloatField

    def __str__(self):
        return self.name


# api/models.py
class MenuItem(models.Model):
    CATEGORY_CHOICES = [
        ('Entradas', 'Entradas'),
        ('PlatosPrincipales', 'PlatosPrincipales'),
        ('Postres', 'Postres'),
    ]
    restaurant = models.ForeignKey(Restaurant, related_name='menu_items', on_delete=models.CASCADE)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    name = models.CharField(max_length=100)
    price = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.name} - {self.restaurant.name}"

# api/models.py
class Review(models.Model):
    restaurant = models.ForeignKey(Restaurant, related_name='reviews', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comida = models.CharField(max_length=100)
    abundancia = models.FloatField(default=0.0)  # Cambiado de IntegerField a FloatField
    sabor = models.FloatField(default=0.0)  # Cambiado de IntegerField a FloatField
    calidadPrecio = models.FloatField(default=0.0)  # Cambiado de IntegerField a FloatField
    limpieza = models.FloatField(default=0.0)  # Cambiado de IntegerField a FloatField
    atencion = models.FloatField(default=0.0)  # Cambiado de IntegerField a FloatField
    ambiente = models.FloatField(default=0.0)  # Cambiado de IntegerField a FloatField
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Reseña de {self.user.username} en {self.restaurant.name}"
