# Generated by Django 5.0.1 on 2024-01-12 15:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0005_leaving_reservation_parking_slot'),
    ]

    operations = [
        migrations.AddField(
            model_name='leaving',
            name='leave',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='reservation',
            name='parking_slot',
            field=models.CharField(default='0', max_length=3),
        ),
    ]
