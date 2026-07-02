from django.shortcuts import render, get_object_or_404
from apps.dashboard.models import Blog

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

def business_bay(request):
    return render(request, "website/pages/location-business-bay.html")

def down_town(request):
    return render(request, "website/pages/location-down-town.html")

def blog(request):

    blogs = (
        Blog.objects
        .filter(status="Published")
        .select_related("category", "author")
        .order_by("-created_at")
    )

    return render(
        request,
        "website/pages/blog.html",
        {
            "blogs": blogs,
        },
    )


def blog_detail(request, slug):
    blog = get_object_or_404(
        Blog,
        slug=slug,
        status="Published"
    )

    return render(
        request,
        "website/pages/blog_detail.html",
        {
            "blog": blog,
        },
    )

def contact(request):
    return render(request, "website/pages/contact.html")

def booking(request):
    return render(request, "website/pages/booking.html")
