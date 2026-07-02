# models.py
from ckeditor import widgets
from django.db import models
from django.contrib.auth.models import User
# pyrefly: ignore [missing-import]
from ckeditor_uploader.fields import RichTextUploadingField
# pyrefly: ignore [missing-import]
from ckeditor.fields import RichTextField


class Profile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)
    usergroup = models.ForeignKey(
        'UserGroup', on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=100, blank=True)
    image = models.ImageField(
        upload_to='profile_images', blank=True, null=True)

    class Meta:
        db_table = 'dashboard_profile'


class UserGroup(models.Model):
    name = models.CharField(max_length=100)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "dash_usergroup"


class Module(models.Model):
    name = models.CharField(max_length=100)
    url_name = models.CharField(max_length=255, null=True, blank=True)
    icon_class = models.CharField(max_length=100, blank=True)
    priority = models.IntegerField(default=0)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "dash_module"
        ordering = ['priority', 'id']


class Child(models.Model):
    module = models.ForeignKey(
        Module, related_name='children', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    url_name = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"{self.name} (Child of {self.module.name})"

    class Meta:
        db_table = "dash_child"


class Permission(models.Model):
    usergroup = models.ForeignKey(
        UserGroup, on_delete=models.CASCADE, null=True, blank=True)
    module = models.ForeignKey(
        Module, on_delete=models.CASCADE, null=True, blank=True)
    enabled = models.BooleanField(default=False)

    class Meta:
        db_table = "dash_permission"


class Page(models.Model):
    POSITION_CHOICES = [
        ('header', 'Header'),
        ('footer', 'Footer'),
    ]

    position = models.CharField(
        max_length=50,
        choices=POSITION_CHOICES,
        verbose_name="Position"
    )

    parent = models.ForeignKey(
        'self',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        verbose_name="Parent Page"
    )

    page_name = models.CharField(
        max_length=200,
        verbose_name="Page Name",
        null=True,
    )

    title = models.CharField(
        max_length=200,
        verbose_name="Title"
    )

    slug = models.SlugField(
        unique=True,
        help_text="URL friendly name (e.g. about-us, contact)",
        verbose_name="URL"
    )

    priority = models.IntegerField(
        default=0,
        verbose_name="Priority"
    )

    description = RichTextUploadingField(
        blank=True,
        verbose_name="Description"
    )

    # SEO Fields
    meta_title = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name="Meta Title"
    )

    meta_keywords = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name="Meta Keywords"
    )
    show_in_menu = models.BooleanField(default=True)

    meta_description = models.TextField(
        blank=True,
        null=True,
        verbose_name="Meta Description"
    )

    class Meta:
        ordering = ['priority', 'title']
        verbose_name = "Page"
        verbose_name_plural = "Pages"

    def __str__(self):
        return self.title

    class Meta:
        db_table = "dash_page"


class Gallery(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='gallery/')

    def __str__(self):
        return self.title


class FileManager(models.Model):

    name = models.CharField(max_length=200)
    image = models.ImageField(
        upload_to='gallery/'
    )
    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.name

    @property
    def image_url(self):
        return self.image.url

# blog models


class Category(models.Model):
    category_name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=150, unique=True, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.category_name


STATUS_CHOICES = (
    ('Draft', 'Draft'),
    ('Published', 'Published')
)


class Blog(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(max_length=150, unique=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    featured_image = models.ImageField(upload_to='blog/')
    short_description = models.TextField(max_length=500)
    meta_tags = models.CharField(max_length=255, blank=True, null=True,
                                 help_text="Comma-separated tags (e.g., Laundry Care, Dry cleaning Tips)")
    blog_body = RichTextField()
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='Draft')
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class ContactEnquiry(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True, null=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.subject}"

    class Meta:
        verbose_name_plural = "Contact Enquiries"


class ServiceEnquiry(models.Model):
    fullname = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    preferred_date = models.DateField()
    service_type = models.CharField(max_length=100)
    pickup_address = models.CharField(max_length=255)
    issue_description = models.TextField(blank=True, null=True)
    landmarks = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.fullname} - {self.service_type}"

    class Meta:
        verbose_name_plural = "Service Enquiries"
