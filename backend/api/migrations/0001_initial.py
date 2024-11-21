# Generated by Django 5.1.3 on 2024-11-21 20:47

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Restaurant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('coords', models.JSONField()),
                ('specialty', models.CharField(max_length=100)),
                ('hours', models.CharField(max_length=50)),
                ('phone', models.CharField(max_length=20)),
                ('visited', models.BooleanField(default=False)),
                ('rating', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('avatar', models.URLField(blank=True)),
                ('phone', models.CharField(blank=True, max_length=20)),
                ('preferences', models.JSONField(blank=True, default=dict)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='MenuItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(choices=[('Entradas', 'Entradas'), ('PlatosPrincipales', 'PlatosPrincipales'), ('Postres', 'Postres')], max_length=50)),
                ('name', models.CharField(max_length=100)),
                ('price', models.CharField(max_length=20)),
                ('restaurant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='menu_items', to='api.restaurant')),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comida', models.CharField(max_length=100)),
                ('abundancia', models.IntegerField()),
                ('sabor', models.IntegerField()),
                ('calidadPrecio', models.IntegerField()),
                ('limpieza', models.IntegerField()),
                ('atencion', models.IntegerField()),
                ('ambiente', models.IntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('restaurant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to='api.restaurant')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
