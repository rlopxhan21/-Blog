# Generated by Django 3.2 on 2022-12-29 05:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blogapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='title',
            field=models.CharField(default=1, max_length=1024),
            preserve_default=False,
        ),
    ]
