# Generated by Django 5.0.1 on 2024-01-16 21:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0007_appuser_delete_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='appuser',
            name='username',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
