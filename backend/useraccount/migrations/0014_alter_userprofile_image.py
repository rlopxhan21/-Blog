# Generated by Django 4.1 on 2023-01-09 01:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('useraccount', '0013_alter_userprofile_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='image',
            field=models.ImageField(blank=True, default='default.jpg', null=True, upload_to=''),
        ),
    ]
