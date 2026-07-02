from .models import Profile, Module
from .models import Permission
from .models import Page



def global_user_profile(request):
    # Debugging: Log the current user being processed
    print(f"Processing user: {request.user}")

    if request.user.is_authenticated:
        try:
            # Fetch the profile associated with the logged-in user
            profile = Profile.objects.get(user=request.user)
            return {'global_user_profile': profile}
        except Profile.DoesNotExist:
            return {'global_user_profile': None}
    return {'global_user_profile': None}



def global_variables(request):
    modules = Module.objects.all()
    user_profile = None
    if request.user.is_authenticated:
        user_profile = Profile.objects.filter(user=request.user).first()
        if user_profile and user_profile.usergroup:
            perms = Permission.objects.filter(
                usergroup=user_profile.usergroup,
                enabled=True
            )
            allowed_module_ids = perms.values_list('module_id', flat=True)
            modules = modules.filter(id__in=allowed_module_ids)

    return {
        'modules': modules,
        'global_user_profile': user_profile,
    }


def user_permissions(request):
    if request.user.is_authenticated:
        try:
            profile = request.user.profile
            usergroup = profile.usergroup

            # Fetch all enabled permissions with module + children
            permissions = Permission.objects.filter(
                usergroup=usergroup,
                enabled=True
            ).select_related('module').prefetch_related('module__children')

            modules = []
            for perm in permissions:
                modules.append({
                    'name': perm.module.name,
                    'url_name': perm.module.url_name,
                    'icon_class': perm.module.icon_class,
                    'children': [
                        {
                            'name': child.name,
                            'url_name': child.url_name,
                        }
                        for child in perm.module.children.all()
                    ]
                })

            return {'user_permissions': modules}
        except Exception:
            pass
    return {'user_permissions': []}


def main_nav(request):
    """Inject header nav pages into every template automatically."""
    return {
        'main_nav_pages': Page.objects.filter(
            show_in_menu=True,
            position='header',
            parent__isnull=True
        ).order_by('priority', 'page_name')
    }