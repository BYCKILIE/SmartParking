from django.db import models


class User(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    cnp = models.CharField(max_length=100, default='unknown')
    gender = models.CharField(max_length=1, default='U')
    email = models.EmailField()
    password = models.CharField(max_length=100, unique=True)
    phone = models.CharField(max_length=30)
    address = models.CharField(max_length=255, default='unknown')
    ipaddress = models.CharField(max_length=20, default='none')


class ParkingSlots(models.Model):
    state = models.BooleanField()


class Reservation(models.Model):
    license_plate = models.CharField(max_length=30)
    entry = models.DateTimeField()
    leave = models.DateTimeField()
    parking_slot = models.CharField(max_length=3, default='0')


class Leaving(models.Model):
    license_plate = models.CharField(max_length=30)
    leave = models.DateTimeField(null=True)
