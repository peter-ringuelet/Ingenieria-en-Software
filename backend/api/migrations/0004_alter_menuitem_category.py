# Generated by Django 5.1.3 on 2024-11-21 23:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_menuitem_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='menuitem',
            name='category',
            field=models.CharField(choices=[('Entradas', 'Entradas'), ('PlatosPrincipales', 'PlatosPrincipales'), ('Postres', 'Postres')], max_length=50),
        ),
    ]
