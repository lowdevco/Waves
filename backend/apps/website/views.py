from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from apps.dashboard.models import Blog, ContactEnquiry, CompanyDetails, Page

def home(request):
    page = Page.objects.filter(slug='home').first()
    return render(request, "website/pages/index.html", {"page": page})

def about(request):
    page = Page.objects.filter(slug='about').first()
    return render(request, "website/pages/about.html", {"page": page})

def service(request):
    page = Page.objects.filter(slug='service').first()
    return render(request, "website/pages/service.html", {"page": page})

def location(request):
    page = Page.objects.filter(slug='location').first()
    return render(request, "website/pages/location.html", {"page": page})

def creek_harbour(request):
    page = Page.objects.filter(slug='location-creek-harbour').first()
    return render(request, "website/pages/location-creek-harbour.html", {"page": page})

def business_bay(request):
    page = Page.objects.filter(slug='location-business-bay').first()
    return render(request, "website/pages/location-business-bay.html", {"page": page})

def down_town(request):
    page = Page.objects.filter(slug='location-down-town').first()
    return render(request, "website/pages/location-down-town.html", {"page": page})

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
    if request.method == "POST":
        name = request.POST.get("name")
        email = request.POST.get("email")
        phone = request.POST.get("phone")
        subject = request.POST.get("subject", "New Contact Enquiry")
        message = request.POST.get("message")

        # Get the company email from CompanyDetails
        company = CompanyDetails.objects.first()
        admin_email = company.email if company and company.email else settings.DEFAULT_FROM_EMAIL

        # Send email first
        try:
            send_mail(
                subject=f"New Contact Form Submission: {subject}",
                message=f"Name: {name}\nEmail: {email}\nPhone: {phone}\n\nMessage:\n{message}",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[admin_email],
                fail_silently=False,
            )
            
            # Save to database only if email was sent successfully
            enquiry = ContactEnquiry.objects.create(
                name=name,
                email=email,
                phone=phone,
                subject=subject,
                message=message
            )
            
            return JsonResponse({"success": True, "message": "Your message has been sent successfully!"})
        except Exception as e:
            return JsonResponse({"success": False, "message": "Failed to send email. Please try again later."})

    page = Page.objects.filter(slug='contact').first()
    return render(request, "website/pages/contact.html", {"page": page})

def booking(request):
    page = Page.objects.filter(slug='booking').first()
    return render(request, "website/pages/booking.html", {"page": page})

def dynamic_page(request, slug):
    from django.shortcuts import get_object_or_404
    page = get_object_or_404(Page, slug=slug)
    return render(request, "website/pages/dynamic_page.html", {"page": page})
