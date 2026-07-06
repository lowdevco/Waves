from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from django.contrib import messages
from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from apps.dashboard.models import Blog, ContactEnquiry, BookingEnquiry, CompanyDetails, Page


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
            # Send Email 1 to Client
            client_subject = "We Received Your Message!"
            client_html = render_to_string('emails/contact_client.html', {
                'name': name,
                'subject': subject,
                'email': email,
                'phone': phone,
                'message': message,
                'base_url': request.build_absolute_uri('/')[:-1]
            })
            msg_client = EmailMultiAlternatives(
                subject=client_subject,
                body=f"Dear {name},\n\nThank you for reaching out. We have received your message regarding {subject}.\n\n{message}\n\nOur team will review your inquiry and get back to you shortly.\n\nBest regards,\nWaves Laundry Team",
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[email]
            )
            msg_client.attach_alternative(client_html, "text/html")
            msg_client.send(fail_silently=False)

            # Send Email 2 to Admin
            admin_subject = f"New Contact Form Submission: {subject}"
            admin_html = render_to_string('emails/contact_admin.html', {
                'name': name,
                'email': email,
                'phone': phone,
                'subject': subject,
                'message': message
            })
            msg_admin = EmailMultiAlternatives(
                subject=admin_subject,
                body=f"Name: {name}\nEmail: {email}\nPhone: {phone}\n\nMessage:\n{message}",
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[admin_email]
            )
            msg_admin.attach_alternative(admin_html, "text/html")
            msg_admin.send(fail_silently=False)

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


def submit_booking(request):
    if request.method == "POST":
        import json
        try:
            data = json.loads(request.body)
            fullname = data.get("name")
            email = data.get("email")
            phone = data.get("mobile")
            pickup_date = data.get("date")
            pickup_time = data.get("time")
            service_speed = data.get("serviceSpeed", "standard")
            pickup_address = data.get("address")
            special_instructions = data.get("notes")

            # Validate required fields
            if not all([fullname, email, phone, pickup_date, pickup_address]):
                return JsonResponse({"success": False, "message": "All required fields must be filled."})

            # Get the company email from CompanyDetails
            company = CompanyDetails.objects.first()
            admin_email = company.email if company and company.email else settings.DEFAULT_FROM_EMAIL

            # Send Email 1 to Client
            client_subject = "Waves Laundry - Booking Confirmed!"
            client_message = (
                f"Dear {fullname},\n\n"
                f"Your laundry pickup booking has been successfully confirmed!\n\n"
                f"Booking Details:\n"
                f"- Pickup Date: {pickup_date}\n"
                f"- Pickup Time: {pickup_time if pickup_time else 'Not specified'}\n"
                f"- Service Speed: {service_speed.capitalize()}\n"
                f"- Pickup Address: {pickup_address}\n"
            )
            if special_instructions:
                client_message += f"- Special Instructions: {special_instructions}\n"
            client_message += "\nOur representative will contact you soon regarding your order.\n\nBest regards,\nWaves Laundry Team"

            # Send Email 2 to Admin
            admin_subject = f"New Pickup Order Received: {fullname}"
            admin_message = (
                f"A new pickup order has been submitted.\n\n"
                f"Customer Details:\n"
                f"- Name: {fullname}\n"
                f"- Mobile: {phone}\n"
                f"- Email: {email}\n"
                f"- Pickup Address: {pickup_address}\n"
                f"- Pickup Date: {pickup_date}\n"
                f"- Pickup Time: {pickup_time if pickup_time else 'Not specified'}\n"
                f"- Service Speed: {service_speed.capitalize()}\n"
            )
            if special_instructions:
                admin_message += f"- Special Instructions: {special_instructions}\n"
            admin_message += f"\nTo contact the client directly, call {phone} or email {email}."

            # Send Email 1 to Client
            client_subject = "Waves Laundry - Booking Confirmed!"
            client_html = render_to_string('emails/booking_client.html', {
                'fullname': fullname,
                'pickup_date': pickup_date,
                'pickup_time': pickup_time,
                'service_speed': service_speed,
                'pickup_address': pickup_address,
                'special_instructions': special_instructions,
                'base_url': request.build_absolute_uri('/')[:-1]
            })
            msg_client = EmailMultiAlternatives(
                subject=client_subject,
                body=client_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[email]
            )
            msg_client.attach_alternative(client_html, "text/html")
            msg_client.send(fail_silently=False)

            # Send Email 2 to Admin
            admin_subject = f"New Pickup Order Received: {fullname}"
            admin_html = render_to_string('emails/booking_admin.html', {
                'fullname': fullname,
                'email': email,
                'phone': phone,
                'pickup_date': pickup_date,
                'pickup_time': pickup_time,
                'service_speed': service_speed,
                'pickup_address': pickup_address,
                'special_instructions': special_instructions
            })
            msg_admin = EmailMultiAlternatives(
                subject=admin_subject,
                body=admin_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[admin_email]
            )
            msg_admin.attach_alternative(admin_html, "text/html")
            msg_admin.send(fail_silently=False)

            # Save to database ONLY if emails were sent successfully
            enquiry = BookingEnquiry.objects.create(
                fullname=fullname,
                email=email,
                phone=phone,
                pickup_date=pickup_date,
                pickup_time=pickup_time if pickup_time else None,
                service_speed=service_speed,
                pickup_address=pickup_address,
                special_instructions=special_instructions
            )

            return JsonResponse({"success": True})
        except Exception as e:
            return JsonResponse({"success": False, "message": f"SMTP / Mail Error: {str(e)}"})

    return JsonResponse({"success": False, "message": "Invalid request method."})
