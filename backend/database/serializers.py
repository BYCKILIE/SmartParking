from rest_framework import serializers
from .models import ParkingSlots, Reservation, Leaving, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class ParkingSlotsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingSlots
        fields = '__all__'


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'


class LeavingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leaving
        fields = '__all__'

