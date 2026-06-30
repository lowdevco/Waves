from django.shortcuts import redirect
from django.urls import resolve
from .models import Permission

EXEMPT_URLS = ['login', 'logout', 'user_permission', 'edit_usergroup', 'dashboard_403']

class PermissionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_authenticated:
            try:
                resolved = resolve(request.path)
                url_name = resolved.url_name

                if url_name in EXEMPT_URLS:
                    return self.get_response(request)

                profile = request.user.profile
                usergroup = profile.usergroup

                # Check if this url_name matches a parent module
                parent_exists = Permission.objects.filter(
                    usergroup=usergroup,
                    module__url_name=url_name
                ).exists()

                if parent_exists:
                    allowed = Permission.objects.filter(
                        usergroup=usergroup,
                        module__url_name=url_name,
                        enabled=True
                    ).exists()
                    if not allowed:
                        return redirect('dashboard_403')

                from .models import Child
                child_exists = Child.objects.filter(url_name=url_name).exists()

                if child_exists:
                    allowed = Permission.objects.filter(
                        usergroup=usergroup,
                        module__children__url_name=url_name,
                        enabled=True
                    ).exists()
                    if not allowed:
                        return redirect('dashboard_403')

            except Exception:
                pass

        return self.get_response(request)