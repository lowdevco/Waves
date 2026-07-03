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
        
    def get_absolute_url(self):
        try:
            from django.urls import reverse
            slug_to_url_name = {
                'location-creek-harbour': 'creek-harbour',
                'location-business-bay': 'business-bay',
                'location-down-town': 'down-town',
            }
            url_name = slug_to_url_name.get(self.slug, self.slug)
            return reverse(url_name)
        except:
            return f"/p/{self.slug}/"

    def get_menu_children(self):
        return self.page_set.filter(show_in_menu=True).order_by('priority')

    def is_active(self, current_url_name):
        if self.slug == current_url_name:
            return True
        # Check if any child slug matches the current url_name
        # Note: slug_to_url_name mapping for location-creek-harbour etc.
        for child in self.page_set.all():
            slug_to_url_name = {
                'location-creek-harbour': 'creek-harbour',
                'location-business-bay': 'business-bay',
                'location-down-town': 'down-town',
            }
            child_url_name = slug_to_url_name.get(child.slug, child.slug)
            if child_url_name == current_url_name:
                return True
        return False

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


class CompanyDetails(models.Model):
    company_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    short_description = models.TextField(blank=True, null=True)
    company_logo = models.ImageField(upload_to='company_logos/', blank=True, null=True)

    def save(self, *args, **kwargs):
        self.pk = 1
        super(CompanyDetails, self).save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj

    def __str__(self):
        return self.company_name or "Company Profile"
    
    class Meta:
        verbose_name_plural = "Company Details"


import os
from django.db.models.signals import pre_save, post_delete
from django.dispatch import receiver

# Define which fields to clean up for each model
MEDIA_MODELS = {
    Profile: 'image',
    Gallery: 'image',
    FileManager: 'image',
    CompanyDetails: 'company_logo',
}

@receiver(post_delete)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    """
    Deletes file from filesystem when corresponding object is deleted.
    """
    if sender in MEDIA_MODELS:
        field_name = MEDIA_MODELS[sender]
        file_field = getattr(instance, field_name, None)
        if file_field:
            if os.path.isfile(file_field.path):
                os.remove(file_field.path)

@receiver(pre_save)
def auto_delete_file_on_change(sender, instance, **kwargs):
    """
    Deletes old file from filesystem when corresponding object is updated with a new file.
    """
    if sender in MEDIA_MODELS:
        if not instance.pk:
            return False

        try:
            old_instance = sender.objects.get(pk=instance.pk)
        except sender.DoesNotExist:
            return False

        field_name = MEDIA_MODELS[sender]
        old_file = getattr(old_instance, field_name, None)
        new_file = getattr(instance, field_name, None)

        if not old_file:
            return

        if old_file != new_file:
            if os.path.isfile(old_file.path):
                os.remove(old_file.path)

