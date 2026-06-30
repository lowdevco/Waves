from django.shortcuts import render


def home(request):
    return render(request, "website/pages/index.html")


def about(request):
    return render(request, "website/pages/about.html")


def service(request):
    return render(request, "website/pages/service.html")


def location(request):
    return render(request, "website/pages/location.html")


def creek_harbour(request):
    return render(request, "website/pages/location-creek-harbour.html")


def blog(request):
    return render(request, "website/pages/blog.html")


def contact(request):
    return render(request, "website/pages/contact.html")


def booking(request):
    return render(request, "website/pages/booking.html")
