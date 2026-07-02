from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("about", views.about, name="about"),
    path("services", views.service, name="service"),
    path("locations", views.location, name="location"),
    path("locations/creek-harbour", views.creek_harbour, name="creek-harbour"),
    path("locations/business-bay", views.business_bay, name="business-bay"),
    path("locations/down-town", views.down_town, name="down-town"),
    path("blog", views.blog, name="blog"),
    path("blog/<slug:slug>/", views.blog_detail, name="blog_detail",),
    path("contact", views.contact, name="contact"),
    path("booking", views.booking, name="booking"),
]
