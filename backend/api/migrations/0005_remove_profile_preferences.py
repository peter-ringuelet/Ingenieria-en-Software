# Generated by Django 5.1.3 on 2024-11-21 23:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_menuitem_category'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='preferences',
        ),
    ]
