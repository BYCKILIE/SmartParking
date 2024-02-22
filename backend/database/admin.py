from django.contrib import admin
from .models import User, Leaving, ParkingSlots, Reservation


admin.site.register(User)
admin.site.register(Leaving)
admin.site.register(ParkingSlots)
admin.site.register(Reservation)
