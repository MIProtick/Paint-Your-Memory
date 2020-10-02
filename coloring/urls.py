from django.urls import path
from . import views

urlpatterns = [
    path('', views.color, name='color'),
    path('colorImg', views.colorImg, name='colorImg'),
]


