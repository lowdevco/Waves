from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("django-admin/", admin.site.urls),
    path("admin/", include("apps.dashboard.urls")),
    path("", include("apps.website.urls")),
]
