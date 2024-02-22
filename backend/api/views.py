from rest_framework.decorators import api_view
from database.models import ParkingSlots, Reservation, User
from database.serializers import ParkingSlotsSerializer, ReservationSerializer, UserSerializer
import json
from datetime import datetime
from django.utils import timezone
from rest_framework.response import Response
from rest_framework import status


# API view for handling GET requests to retrieve the current parking state.
# Fetches data from ParkingSlots and Reservation models, serializes them, and structures the response.
@api_view(['GET'])
def get_parking_state(request):
    parking_state = ParkingSlots.objects.all()
    serializer = ParkingSlotsSerializer(parking_state, many=True)
    state = serializer.data

    reservations = Reservation.objects.all()

    class CustomReservationSerializer(ReservationSerializer):
        class Meta:
            model = Reservation
            exclude = ['license_plate']

    serializer = CustomReservationSerializer(reservations, many=True)
    res = serializer.data
    for d in res:
        d['parking_slot'] = int(d['parking_slot'][1:])
    return Response({'parking_state': state, 'reservations': res}, status=status.HTTP_200_OK)


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


@api_view(['POST'])
def sign_up_user(request):
    request.data['ipaddress'] = get_client_ip(request)
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def log_in_user(request):
    request_data = json.loads(request.body.decode('utf-8'))
    email = request_data.get('email')
    password = request_data.get('password')
    is_unique = User.objects.filter(email=email, password=password).exists()
    if is_unique:
        data = User.objects.get(email=email, password=password)
        serializer = UserSerializer(data, data={'ipaddress': get_client_ip(request)}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def log_out(request):
    try:
        user = User.objects.get(ipaddress=get_client_ip(request))
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = UserSerializer(user, data={'ipaddress': 'none'}, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_logged_in_data(request):
    data = User.objects.get(ipaddress=get_client_ip(request))
    serializer = UserSerializer(data)
    return Response(serializer.data)


# API view for handling POST requests to create parking reservations.
# Parses incoming JSON data, calculates departure time, and validates using ReservationSerializer.
# Saves a new reservation if data is valid; returns success or validation errors.
@api_view(['POST'])
def make_reservation(request):
    request_data = json.loads(request.body.decode('utf-8'))

    entry = datetime.strptime(request_data.get('entry'), '%Y-%m-%dT%H:%M')
    leave = entry + timezone.timedelta(minutes=int(request_data.get('leave')))
    slot = request_data.get('parking_slot')

    serializer_data = {
        'entry': entry,
        'leave': leave,
        'license_plate': request_data.get('license_plate'),
        'parking_slot': 'L0' + str(slot) if slot < 10 else 'L' + str(slot),
    }
    serializer = ReservationSerializer(data=serializer_data)

    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
