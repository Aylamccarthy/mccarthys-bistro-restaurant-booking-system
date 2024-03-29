# Generated by Django 3.2.19 on 2023-07-27 14:30

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("menu", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="menu",
            name="cover",
            field=cloudinary.models.CloudinaryField(
                default="https://res.cloudinary.com/aylamccarthy/image/upload/v1690467352/pexels-dana-tentis-725991_dj1rmi.jpg",
                max_length=255,
                verbose_name="image",
            ),
        ),
    ]
