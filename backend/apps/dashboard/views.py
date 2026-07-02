from django.utils.text import slugify
from .forms import BlogPostForm
from .models import Blog
from .forms import CategoryForm
from .models import Category
from .forms import FileManagerForm, GalleryForm, RegistrationForm
from django.contrib.auth import authenticate, login as auth_login
from django.shortcuts import render, redirect
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth import logout as auth_logout
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.hashers import make_password
from .models import FileManager, Gallery, Profile, ContactEnquiry, ServiceEnquiry
from django.contrib import messages
from .models import Permission
from .forms import UserGroupForm
from .models import UserGroup
from django.shortcuts import get_object_or_404
from .models import UserGroup, Module, Permission, Child
from .forms import UserGroupForm
from django.core.paginator import Paginator
from django.shortcuts import render, get_object_or_404, redirect
from .models import Module, User
from .forms import ModuleForm, ChildFormSet
from django.db import transaction
from .forms import PageForm
from .models import Page
from django.contrib.auth import update_session_auth_hash
from django.urls import reverse


@csrf_protect
def login(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        print(f"DEBUG: username={username}, password={'*' * len(password or '')}")
        user = authenticate(request, username=username, password=password)
        print(f"DEBUG: user={user}")
        if user is not None:
            auth_login(request, user)
            print("DEBUG: login success, redirecting to index")
            return redirect('index')
        else:
            print("DEBUG: authentication failed")
            return render(request, 'dashboard/pages/login.html', {'error': 'Invalid credentials'})
    return render(request, 'dashboard/pages/login.html')


def logout(request):
    auth_logout(request)
    messages.success(request, "You have successfully logged out.")
    return redirect('login')


def get_dashboard_cards():
    return [
        {'title': 'Usergroup', 'count': UserGroup.objects.count(), 'icon': 'fas fa-users', 'url': reverse('usergroup')},
        {'title': 'Users', 'count': User.objects.count(), 'icon': 'far fa-user', 'url': reverse('users_list')},
        {'title': 'Pages', 'count': Page.objects.count(), 'icon': 'far fa-file-alt', 'url': reverse('page_view')},
        {'title': 'Enquiries', 'count': ContactEnquiry.objects.count() + ServiceEnquiry.objects.count(), 'icon': 'far fa-comments', 'url': reverse('contact_requests')},
        {'title': 'Services', 'count': ServiceEnquiry.objects.count(), 'icon': 'fas fa-cogs', 'url': reverse('service_enquiries')},
        {'title': 'News', 'count': Blog.objects.count(), 'icon': 'far fa-newspaper', 'url': reverse('posts')},
    ]

@login_required
def index(request):
    modules = Module.objects.all()
    user_profile = Profile.objects.filter(user=request.user).first()

    context = {
        'dashboard_cards': get_dashboard_cards(),
    }

    if user_profile is None:
        context.update({
            'modules': modules,
            'global_user_profile': None,
        })
        return render(request, 'dashboard/pages/index.html', context)

    perms = Permission.objects.filter(
        usergroup=user_profile.usergroup,
        enabled=True
    )

    # Get the IDs of modules the user has permission to see
    allowed_module_ids = perms.values_list('module_id', flat=True)
    modules = modules.filter(id__in=allowed_module_ids)

    context.update({
        'modules': modules,
        'global_user_profile': user_profile,
    })
    return render(request, 'dashboard/pages/index.html', context)


def module_view(request, module_id):
    module = get_object_or_404(Module, id=module_id)
    template_name = (
        f'dashboard/pages/{module.url_name}.html'
        if module.url_name
        else 'dashboard/pages/index.html'
    )
    context = {'module': module}
    if template_name == 'dashboard/pages/index.html':
        context['dashboard_cards'] = get_dashboard_cards()
    return render(request, template_name, context)


def child_view(request, child_id):
    child = get_object_or_404(Child, id=child_id)
    template_path = (
        f'dashboard/pages/{child.url_name}.html'
        if child.url_name
        else 'dashboard/pages/add_usergroup.html'
    )
    return render(request, template_path, {'child': child})

def is_admin(user):
    return user.is_superuser or user.is_staff

@login_required
@user_passes_test(is_admin)
def add_usergroup(request):
    if request.method == 'POST':
        form = UserGroupForm(request.POST)
        if form.is_valid():
            group_name = form.cleaned_data['name'].strip()

            if UserGroup.objects.filter(name__iexact=group_name).exists():
                messages.error(request, f"Group '{group_name}' already exists.")
            else:
                usergroup = form.save(commit=False)
                usergroup.name = group_name
                usergroup.save()
                messages.success(request, f"Group '{group_name}' added successfully.")
                return redirect('usergroup')
    else:
        form = UserGroupForm()

    return render(request, 'dashboard/pages/add_usergroup.html', {'form': form})


@login_required
def usergroup(request):
    usergroups = UserGroup.objects.all()
    return render(request, 'dashboard/pages/usergroup.html', {'usergroups': usergroups})
@login_required
@user_passes_test(is_admin)
def edit_usergroup(request, group_id):
    usergroup = get_object_or_404(UserGroup, id=group_id)
    form = UserGroupForm(request.POST or None, instance=usergroup)

    if request.method == 'POST':
        if form.is_valid():
            form.save()
            messages.success(request, "Group updated successfully.")
            return redirect('usergroup')

    return render(request, 'dashboard/pages/edit_usergroup.html', {
        'form': form,
        'usergroup': usergroup,
    })

@login_required
@user_passes_test(is_admin)
def usergroup_delete(request, id):
    group = get_object_or_404(UserGroup, id=id)

    if group.name.lower() == 'admin':
        messages.error(request, "Cannot delete the 'admin' group.")
        return redirect('usergroup')

    # Fix: filter by FK object, not string comparison
    if Profile.objects.filter(usergroup=group).exists():
        messages.error(request, f"Cannot delete group '{group.name}' — it is assigned to existing users.")
        return redirect('usergroup')

    group.delete()
    messages.success(request, f"Group '{group.name}' deleted successfully.")
    return redirect('usergroup')

@login_required
def users_profile(request, user_id):
    user = get_object_or_404(User, id=user_id)
    profile, created = Profile.objects.get_or_create(user=user)
    user = profile.user

    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password1')
        usergroup_name = request.POST.get('usergroup')
        name = request.POST.get('name')
        image = request.FILES.get('image')

        if not username:
            return render(request, 'dashboard/pages/users_profile.html', {
                'error': 'Username is required!',
                'form_data': request.POST,
                'profile': profile,
            })

        user.username = username
        user.email = email
        if password:
            user.set_password(password)
            update_session_auth_hash(request, user)
        user.save()

        # Fix: resolve UserGroup object from name string or ID
        if usergroup_name:
            try:
                if usergroup_name.isdigit():
                    usergroup_obj = UserGroup.objects.get(id=int(usergroup_name))
                else:
                    usergroup_obj = UserGroup.objects.get(name=usergroup_name)
                profile.usergroup = usergroup_obj
            except UserGroup.DoesNotExist:
                messages.error(request, f"Usergroup '{usergroup_name}' does not exist.")
                return render(request, 'dashboard/pages/users_profile.html', {
                    'form_data': request.POST,
                    'profile': profile,
                })

        profile.name = name
        if image:
            profile.image = image
        profile.save()

        messages.success(request, "Profile updated successfully.")
        return redirect('users_profile', user_id=user.id)

    else:
        form_data = {
            'username': user.username,
            'email': user.email,
            'usergroup': profile.usergroup,
            'name': profile.name,
            'image': profile.image,
        }

    usergroups = UserGroup.objects.all()
    return render(request, 'dashboard/pages/users_profile.html', {
        'form_data': form_data,
        'profile': profile,
        'usergroups': usergroups,
    })


@login_required
def users_list(request):
    # Ensure all users have a profile before listing
    for user in User.objects.all():
        Profile.objects.get_or_create(user=user)
        
    profiles = Profile.objects.select_related('user').all()
    return render(request, 'dashboard/pages/users_list.html', {'profiles': profiles})


@login_required
def delete_profile(request, user_id):
    try:
        user = get_object_or_404(User, id=user_id)

        if not request.user.is_superuser and request.user.id != user_id:
            messages.error(request, "You are not authorized to delete this user.")
            return redirect('users_list')

        # Profile is deleted via CASCADE when user is deleted;
        # explicit deletion here is harmless but kept for clarity
        Profile.objects.filter(user=user).delete()

        username = user.username
        user.delete()
        messages.success(request, f"User '{username}' deleted successfully.")

    except Exception as e:
        messages.error(request, f"Error deleting user: {str(e)}")

    return redirect('users_list')


def create_user(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST, request.FILES)
        if form.is_valid():
            user = form.save(commit=False)
            user.email = form.cleaned_data['email']
            user.set_password(form.cleaned_data['password1'])
            user.save()

            usergroup = form.cleaned_data.get('usergroup')
            if not usergroup:
                messages.error(request, "A valid Usergroup must be selected.")
                user.delete()  # Roll back user creation
                return render(request, 'dashboard/pages/create_user.html', {'form': form})

            Profile.objects.create(
                user=user,
                usergroup=usergroup,
                name=form.cleaned_data['name'],
                image=form.cleaned_data.get('image'),
            )

            messages.success(request, f"User '{user.username}' created successfully.")
            return redirect('users_list')
        else:
            # form.errors are passed via the form object automatically
            pass
    else:
        form = RegistrationForm()

    return render(request, 'dashboard/pages/create_user.html', {'form': form})


@login_required
def user_permission(request, usergroup_id):
    usergroup = get_object_or_404(UserGroup, id=usergroup_id)
    modules = Module.objects.all().order_by('id')

    if request.method == 'POST':
        for module in modules:
            checkbox_name = f"module_{module.id}"
            checked = checkbox_name in request.POST

            perm_obj, created = Permission.objects.get_or_create(
                usergroup=usergroup,
                module=module,
            )
            perm_obj.enabled = checked
            perm_obj.save()

        messages.success(request, "Permissions updated successfully.")
        return redirect('usergroup')

    permission_data = []
    for idx, module in enumerate(modules, start=1):
        perm = Permission.objects.filter(usergroup=usergroup, module=module).first()
        enabled = perm.enabled if perm else False
        permission_data.append({
            'sl_no': idx,
            'module': module.name,
            'module_id': module.id,
            'enabled': enabled,
        })

    return render(request, 'dashboard/pages/user_permission.html', {
        'usergroup': usergroup,
        'permission_data': permission_data,
    })


def add_page(request):
    if request.method == 'POST':
        form = PageForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Page added successfully.")
            return redirect('page_view')
        else:
            # Show errors back in the form
            return render(request, 'dashboard/pages/add_page.html', {'form': form})
    else:
        form = PageForm()
    return render(request, 'dashboard/pages/add_page.html', {'form': form})


def edit_page(request, page_id):
    page = get_object_or_404(Page, id=page_id)
    if request.method == 'POST':
        form = PageForm(request.POST, instance=page)
        if form.is_valid():
            form.save()
            messages.success(request, "Page updated successfully.")
            return redirect('page_view')
        else:
            return render(request, 'dashboard/pages/edit_page.html', {'form': form, 'page': page})
    else:
        form = PageForm(instance=page)
    return render(request, 'dashboard/pages/edit_page.html', {'form': form, 'page': page})


def delete_page(request, page_id):
    page = get_object_or_404(Page, id=page_id)
    page.delete()
    messages.success(request, f"Page '{page.title}' deleted successfully.")
    return redirect('page_view')


def toggle_page_status(request, page_id):
    page = get_object_or_404(Page, id=page_id)
    page.show_in_menu = not page.show_in_menu
    page.save()
    status = "activated" if page.show_in_menu else "deactivated"
    messages.success(request, f"Page '{page.title}' {status} successfully.")
    return redirect('page_view')


def enquiry_view(request):
    return render(request, 'dashboard/pages/enquiry.html', {})


def page_view(request):
    pages = Page.objects.all().order_by('priority', 'title')
    return render(request, 'dashboard/pages/page.html', {'pages': pages})

import base64
from django.core.files.base import ContentFile

def add_gallery(request):

    if request.method == 'POST':

        cropped_image = request.POST.get('cropped_image')

        if cropped_image:

            format, imgstr = cropped_image.split(';base64,')
            ext = format.split('/')[-1]

            image_file = ContentFile(
                base64.b64decode(imgstr),
                name=f'gallery.{ext}'
            )

            form = GalleryForm(request.POST)

            if form.is_valid():
                gallery = form.save(commit=False)

                # Replace image field name with yours
                gallery.image = image_file

                gallery.save()
                return redirect('gallery_view')

        else:
            form = GalleryForm(request.POST, request.FILES)

            if form.is_valid():
                form.save()
                return redirect('gallery_view')

    else:
        form = GalleryForm()

    return render(
        request,
        'dashboard/pages/add_gallery.html',
        {'form': form}
    )

    return render(request, 'dashboard/pages/add_gallery.html', {'form': form})

def gallery_view(request):
    gallery= Gallery.objects.all()
    return render(request, 'dashboard/pages/gallery.html', {'gallery': gallery})

def edit_gallery(request, id):

    gallery = get_object_or_404(Gallery, id=id)

    if request.method == 'POST':
        form = GalleryForm(request.POST, request.FILES, instance=gallery)

        if form.is_valid():
            form.save()
            return redirect('gallery_view')

    else:
        form = GalleryForm(instance=gallery)

    return render(request, 'dashboard/pages/add_gallery.html', {'form': form})


def delete_gallery(request, id):

    gallery = get_object_or_404(Gallery, id=id)

    if gallery.image:
        gallery.image.delete()

    gallery.delete()

    return redirect('gallery_view')
def add_file(request):

    form = FileManagerForm()

    if request.method == 'POST':

        form = FileManagerForm(
            request.POST,
            request.FILES
        )

        if form.is_valid():

            form.save()

            return redirect('file_manager')

        else:
            print(form.errors)

    return render(
        request,
        'dashboard/pages/add_file.html',
        {
            'form': form
        }
    )


def file_manager(request):
    files = FileManager.objects.all().order_by('id')

    
    return render(request, 'dashboard/pages/file_manager.html', {'files': files})

# EDIT VIEW
def edit_file(request, id):

    file = get_object_or_404(
        FileManager,
        id=id
    )

    if request.method == 'POST':

        form = FileManagerForm(
            request.POST,
            request.FILES,
            instance=file
        )

        if form.is_valid():
            form.save()
            return redirect('file_manager')

    else:
        form = FileManagerForm(instance=file)

    return render(
        request,
        'dashboard/pages/add_file.html',
        {'form': form}
    )


# DELETE VIEW
def delete_file(request, id):

    file = get_object_or_404(
        FileManager,
        id=id
    )

    # delete image from media folder
    if file.image:
        file.image.delete()

    file.delete()

    return redirect('file_manager')
def test_sidebar(request):
    return render(request, 'includes/sidebar.html')


def test_footer(request):
    return render(request, 'includes/footer.html')


def test_navigation(request):
    return render(request, 'includes/navigation.html')

# blog views

def categories(request):
    categories = Category.objects.all()
    context = {
        'categories': categories,
    }
    return render(request, 'dashboard/pages/blog_categories.html', context)

    
def add_category(request):
    form = CategoryForm()
    if request.method == 'POST':
        form = CategoryForm(request.POST)
        if form.is_valid():
            category = form.save(commit=False)
            category.save()
            category_name = form.cleaned_data.get('category_name')
            category.slug = slugify(category_name)+'-'+str(category.id)
            category.save()
            form = CategoryForm()
        return redirect('categories')
    context = {
        'form': form,
    }
    return render(request, 'dashboard/pages/add_category.html', context)

def edit_category(request, pk):
    category = Category.objects.get(id = pk)
    if request.method == 'POST':
        form = CategoryForm(request.POST, instance=category)
        if form.is_valid():
            category = form.save(commit=False)
            category_name = form.cleaned_data.get('category_name')
            category.slug = slugify(category_name)+'-'+str(category.id)
            category.save()
            return redirect('categories')
    form = CategoryForm(instance=category)
    context = {
        'form': form,
        'category': category,
    }
    return render(request, 'dashboard/pages/edit_category.html', context)

def delete_category(request, pk):
    category = Category.objects.get(id = pk)
    category.delete()
    return redirect('categories')

def posts(request):
    sort_by = request.GET.get('sort', 'recent')
    
    if sort_by == 'oldest':
        posts = Blog.objects.all().order_by('created_at')
    else:
        # Default to recent
        posts = Blog.objects.all().order_by('-created_at')
        
    context = {
        'posts': posts,
        'sort_by': sort_by,
    }
    return render(request, 'dashboard/pages/all_posts.html', context)

def add_post(request):
    if request.method == 'POST':
        form = BlogPostForm(request.POST, request.FILES)
        if form.is_valid():
            post = form.save(commit = False)
            post.author = request.user
            post.save()
            title = form.cleaned_data.get('title')
            post.slug = slugify(title)+'-'+str(post.id)
            post.save()
            return redirect('posts')
    else:
        form = BlogPostForm()
        
    context = {
        'form':form,
    }
    return render(request, 'dashboard/pages/add_post.html',context)


def edit_post(request , pk):
    post = Blog.objects.get(id = pk)
    form = BlogPostForm(instance=post)
    if request.method == 'POST':
        form = BlogPostForm(request.POST, request.FILES, instance=post)
        if form.is_valid():
            post = form.save()
            title = form.cleaned_data.get('title')
            post.slug = slugify(title)+'-'+str(post.id)
            post.save()
            return redirect('posts')
    context = {
        'form': form,
        'post': post,
    }
    return render(request, 'dashboard/pages/edit_post.html', context)
def delete_post(request,  pk):
    post = Blog.objects.get(id = pk)
    post.delete()
    return redirect('posts')

# form requests

def service_enquiries(request):
    enquiries = ServiceEnquiry.objects.all().order_by('-created_at')
    return render(request, 'dashboard/pages/service_enquiry.html', {'enquiries': enquiries})

def contact_requests(request):
    enquiries = ContactEnquiry.objects.all().order_by('-created_at')
    return render(request, 'dashboard/pages/contact_enquiry.html', {'enquiries': enquiries})

def general_enquiries(request):
    return render(request, 'dashboard/pages/general_enquiry.html', {})

def delete_service_enquiry(request, id):
    enquiry = get_object_or_404(ServiceEnquiry, id=id)
    enquiry.delete()
    messages.success(request, 'Service enquiry deleted successfully.')
    return redirect('service_enquiries')

def delete_contact_enquiry(request, id):
    enquiry = get_object_or_404(ContactEnquiry, id=id)
    enquiry.delete()
    messages.success(request, 'Contact enquiry deleted successfully.')
    return redirect('contact_requests')


# ==========================================

@login_required
def module_priority(request):
    modules = Module.objects.all()
    if request.method == 'POST':
        for module in modules:
            priority_val = request.POST.get(f'priority_{module.id}')
            if priority_val and priority_val.isdigit():
                module.priority = int(priority_val)
                module.save()
        messages.success(request, 'Module positions updated successfully.')
        return redirect('module_priority')
    return render(request, 'dashboard/pages/module_priority.html', {'modules': modules})
