# Generated by Django 3.2.19 on 2023-07-07 21:27

import cloudinary.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Table',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=10, unique=True)),
                ('featured_image', cloudinary.models.CloudinaryField(max_length=255, verbose_name='image')),
                ('no_of_persons', models.IntegerField(default=1)),
            ],
        ),
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('start_time', models.TimeField()),
                ('end_time', models.TimeField()),
                ('customer_full_name', models.CharField(max_length=200)),
                ('customer_email', models.EmailField(max_length=200)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('table', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='bookings.table')),
            ],
            options={
                'ordering': ['date'],
            },
        ),
    ]