# Generated by Django 4.1 on 2023-01-09 02:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('useraccount', '0014_alter_userprofile_image'),
    ]

    operations = [
        migrations.DeleteModel(
            name='UserProfile',
        ),
    ]
