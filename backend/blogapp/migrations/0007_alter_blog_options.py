# Generated by Django 4.1 on 2022-12-31 07:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blogapp', '0006_alter_blog_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='blog',
            options={'ordering': ['created']},
        ),
    ]
