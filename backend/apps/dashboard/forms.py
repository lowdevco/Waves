from .models import Blog
from .models import Category
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.contrib.auth.forms import AuthenticationForm
from .models import Gallery, UserGroup
from django.forms import ModelForm, inlineformset_factory
from .models import Module, Child, Page, FileManager
from .models import Page
# pyrefly: ignore [missing-import]
from ckeditor.widgets import CKEditorWidget


class CustomAuthenticationForm(AuthenticationForm):
    username = forms.CharField(
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter your username'
        })
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter your password'
        })
    )
USERGROUP_CHOICES = [
    ('admin', 'admin'),
    ('developer', 'developer'),
]

class RegistrationForm(UserCreationForm):
    usergroup = forms.ModelChoiceField(
        queryset=UserGroup.objects.all(),
        required=True,
        empty_label="Select a usergroup",
        widget=forms.Select(attrs={
            'class': 'form-control'
        })
    )
    name = forms.CharField(
        max_length=100,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter name'
        })
    )
    email = forms.EmailField(
        required=True,
        widget=forms.EmailInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter email',
            'autocomplete': 'email'  # ← added
        })
    )
    image = forms.ImageField(
        required=False,
        widget=forms.FileInput(attrs={
            'class': 'form-control'
        })
    )

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2', 'usergroup', 'name', 'image']  # ← added password2
        widgets = {
            'username': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter username',
                'autocomplete': 'username'  # ← added
            }),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        # Fix password fields — UserCreationForm defines them outside Meta.widgets
        self.fields['password1'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'Enter password',
            'autocomplete': 'new-password'  # ← added
        })
        self.fields['password2'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'Confirm password',
            'autocomplete': 'new-password'  # ← added
        })

class UserGroupForm(forms.ModelForm):
    class Meta:
        model = UserGroup
        fields = ['name']
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter group name'
            }),
        }

class ModuleForm(ModelForm):
    class Meta:
        model = Module
        fields = ['name', 'url_name', 'icon_class']

ChildFormSet = inlineformset_factory(Module, Child, fields=('name', 'url_name'), extra=1, can_delete=True)

class PageForm(forms.ModelForm):

    description = forms.CharField(
        widget=CKEditorWidget(),
        required=False
    )

    class Meta:
        model = Page
        fields = [
            'position',
            'parent',
            'page_name',      # Added
            'title',
            'slug',           # Changed from 'url' to 'slug'
            'priority',
            'description',
            'show_in_menu',   # Added for nav
            'meta_title',
            'meta_keywords',
            'meta_description',
        ]

        widgets = {
            'position': forms.Select(attrs={'class': 'form-select'}),
            'parent': forms.Select(attrs={'class': 'form-select'}),

            'page_name': forms.TextInput(attrs={'class': 'form-control'}),
            'title': forms.TextInput(attrs={'class': 'form-control'}),
            'slug': forms.TextInput(attrs={'class': 'form-control'}),        # Changed from 'url'

            'priority': forms.NumberInput(attrs={'class': 'form-control'}),
            'show_in_menu': forms.CheckboxInput(attrs={'class': 'form-check-input'}),

            'meta_title': forms.TextInput(attrs={'class': 'form-control'}),
            'meta_keywords': forms.TextInput(attrs={'class': 'form-control'}),
            'meta_description': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 2
            }),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Make important fields required
        self.fields['page_name'].required = True
        self.fields['title'].required = True
        self.fields['slug'].required = True
        # Priority has a model default of 0, so not required in form
        self.fields['priority'].required = False
        self.fields['priority'].initial = 0

class GalleryForm(forms.ModelForm):

    class Meta:
        model = Gallery
        fields = ['title', 'image']
        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-control'}),
            'image': forms.ClearableFileInput(attrs={'class': 'form-control'}),
        }

class FileManagerForm(forms.ModelForm):

    class Meta:
        model = FileManager
        fields = ['name', 'image']

        widgets = {

            'name': forms.TextInput(
                attrs={
                    'class': 'form-control',
                    'placeholder': 'Enter file name'
                }
            ),

            'image': forms.FileInput(
                attrs={
                    'class': 'form-control'
                }
            ),

        }

# blog
class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = '__all__'
        widgets = {
            'category_name': forms.TextInput(attrs={'class': 'form-control'}),
            'slug': forms.TextInput(attrs={'class': 'form-control', 'disabled': 'disabled', 'placeholder': 'Auto-generated from name'}),
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['slug'].required = False

class BlogPostForm(forms.ModelForm):
    class Meta:
        model = Blog
        fields = ('title', 'slug', 'category','featured_image','short_description','meta_tags','blog_body','status','is_featured' )
        widgets = {
            'slug': forms.TextInput(attrs={'class': 'form-control', 'disabled': 'disabled', 'placeholder': 'Auto-generated from title'}),
            'meta_tags': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'e.g., Car Care Qatar, Summer Driving'}),
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['slug'].required = False
