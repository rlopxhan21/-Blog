# Generated by Django 4.1 on 2023-01-07 08:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forumapp', '0006_alter_upvote_author'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='slug',
            field=models.SlugField(blank=True, null=True, unique=True),
        ),
    ]