from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from database.models import ParkingSlots, Reservation, Leaving
from database.serializers import LeavingSerializer, ParkingSlotsSerializer
from .rpi_methods import RpiMethods
from django.utils import timezone


@api_view(['DELETE'])
def cleanup(request):
    past = Reservation.objects.filter(entry__lt=timezone.now() + timezone.timedelta(hours=2, minutes=15))
    past.delete()


# API view handling POST, PUT, and DELETE requests to manage entering and leaving the parking area.
# Utilizes RpiMethods to extract license plate information from the request payload.
# Checks for a valid reservation within a 15-minute window around the current time.
# If a valid reservation is found, updates the parking state, logs the departure, and deletes the reservation.
@api_view(['POST', 'PUT', 'DELETE'])
def enter_parking(request):
    plate = str(RpiMethods.perform(request.body))
    print(plate)
    current_time = timezone.now() + timezone.timedelta(hours=2)

    data = Reservation.objects.filter(license_plate=plate,
                                      entry__lte=current_time + timezone.timedelta(minutes=15),
                                      entry__gte=current_time - timezone.timedelta(minutes=15))
    if data.exists():
        data = data[0]

        response = {'OK': data.parking_slot}

        leave_serializer = LeavingSerializer(data={
            'license_plate': plate,
            'leave': data.leave
        })
        if leave_serializer.is_valid():
            leave_serializer.save()

        state = ParkingSlots.objects.get(id=int(data.parking_slot[1:]))
        state_serializer = ParkingSlotsSerializer(state, data={'state': True}, partial=True)
        if state_serializer.is_valid():
            state_serializer.save()

        data.delete()
        return Response(response)
    return Response({'NK': 'LNO'})


@api_view(['POST', 'DELETE'])
def leave_parking(request):
    plate = str(RpiMethods.perform(request.body))
    is_unique = Leaving.objects.filter(license_plate=plate).exists()
    if is_unique:
        data = Leaving.objects.get(license_plate=plate)
        data.delete()
        return Response({'status': 'OK'})
    return Response({'status': 'NK'})


@api_view(['PUT'])
def leave_slot(request):
    slot = int(request.body.decode()[1:])
    data = ParkingSlots.objects.get(id=slot)
    state_serializer = ParkingSlotsSerializer(data, data={'state': False}, partial=True)
    if state_serializer.is_valid():
        state_serializer.save()
        return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)
