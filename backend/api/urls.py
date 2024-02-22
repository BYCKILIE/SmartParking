from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.sign_up_user),
    path('login/', views.log_in_user),
    path('logout/', views.log_out),
    path('mydata/', views.get_logged_in_data),
    path('state/', views.get_parking_state),
    path('reserve/', views.make_reservation),
]