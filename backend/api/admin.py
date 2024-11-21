from django.contrib import admin
from .models import Restaurant, MenuItem, Review, Profile

admin.site.register(Restaurant)
admin.site.register(MenuItem)
admin.site.register(Review)
admin.site.register(Profile)
