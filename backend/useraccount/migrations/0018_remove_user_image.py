# Generated by Django 4.1 on 2023-01-10 22:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('useraccount', '0017_user_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='image',
        ),
    ]
