from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("about", views.about, name="about"),
    path("services", views.service, name="service"),
    path("locations", views.location, name="location"),
    path("locations/creek-harbour", views.creek_harbour, name="creek-harbour"),
    path("blog", views.blog, name="blog"),
    path("contact", views.contact, name="contact"),
    path("booking", views.booking, name="booking"),
]
