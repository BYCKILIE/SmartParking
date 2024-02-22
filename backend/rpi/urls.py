from django.urls import path
from . import views

urlpatterns = [
    path('entry/', views.enter_parking),
    path('leave/', views.leave_parking),
    path('free-slot/', views.leave_slot),
    path('cleanup/', views.cleanup)
]
