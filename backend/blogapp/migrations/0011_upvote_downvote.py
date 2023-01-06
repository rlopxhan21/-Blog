# Generated by Django 4.1 on 2023-01-05 07:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('blogapp', '0010_alter_blog_created_alter_blog_updated_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Upvote',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='authorblog_upvote', to=settings.AUTH_USER_MODEL)),
                ('blog', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='upvoted_blog', to='blogapp.blog')),
            ],
        ),
        migrations.CreateModel(
            name='Downvote',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='authorblog_downvote', to=settings.AUTH_USER_MODEL)),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='downvoted_blog', to='blogapp.blog')),
            ],
        ),
    ]
