# Generated by Django 4.1 on 2023-01-11 17:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('useraccount', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='image',
            field=models.ImageField(blank=True, default='media/default.jpg', null=True, upload_to=''),
        ),
    ]
