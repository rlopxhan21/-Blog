# Generated by Django 3.2 on 2022-12-29 04:44

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Blog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('created', models.DateField(auto_now_add=True)),
                ('updated', models.DateField(auto_now=True)),
                ('active', models.BooleanField(default=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='author_blog', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-updated'],
            },
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('created', models.DateField(auto_now_add=True)),
                ('updated', models.DateField(auto_now=True)),
                ('active', models.BooleanField(default=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='author_blogcomment', to=settings.AUTH_USER_MODEL)),
                ('blog', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='post_blogcomment', to='blogapp.blog')),
            ],
            options={
                'ordering': ['-updated'],
            },
        ),
        migrations.CreateModel(
            name='BlogRoom',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('slug', models.SlugField(blank=True, null=True)),
                ('description', models.CharField(max_length=1024)),
                ('active', models.BooleanField(default=True)),
                ('author', models.ForeignKey(on_delete=models.SET('AUTHOR NOT AVAILABLE'), to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='blog',
            name='blogroom',
            field=models.ManyToManyField(related_name='blogroom_blog', to='blogapp.BlogRoom'),
        ),
        migrations.AddIndex(
            model_name='comment',
            index=models.Index(fields=['-updated'], name='blogapp_com_updated_c60ef5_idx'),
        ),
        migrations.AddIndex(
            model_name='blog',
            index=models.Index(fields=['-updated'], name='blogapp_blo_updated_951adc_idx'),
        ),
    ]