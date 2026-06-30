from .models import Blog
from .models import Category
from django.contrib import admin
from .models import UserGroup, Module, Permission, Child, Profile

# Inline permission under UserGroup


class PermissionInline(admin.TabularInline):
    model = Permission
    extra = 0


class UserGroupAdmin(admin.ModelAdmin):
    inlines = [PermissionInline]


class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'usergroup', 'name')
    search_fields = ('user__username', 'name')

    # This is important for models with a custom primary key
    def get_object(self, request, object_id, from_field=None):
        # Custom handling for getting the object by user_id instead of id
        queryset = self.get_queryset(request)
        model = queryset.model
        try:
            # Use pk lookup directly since user is the primary key
            object_id = model._meta.pk.to_python(object_id)
            return queryset.get(pk=object_id)
        except (model.DoesNotExist, ValueError, TypeError):
            return None


admin.site.register(UserGroup, UserGroupAdmin)
admin.site.register(Profile, ProfileAdmin)
# Inline child under Module


class ChildInline(admin.TabularInline):
    model = Child
    extra = 1


class ModuleAdmin(admin.ModelAdmin):
    list_display = ('name',)
    inlines = [ChildInline]


admin.site.register(Module, ModuleAdmin)
# Optional: only if you want to manage Child separately too
admin.site.register(Child)


class BlogAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',)}
    list_display = ('title', 'category', 'author', 'status', 'is_featured',)
    search_fields = ('title', 'category__category_name', 'author__username',
                     'status', 'is_featured', 'short_description', 'blog_body')
    list_editable = ('is_featured',)


admin.site.register(Category)
admin.site.register(Blog)

#  addd cpanell
