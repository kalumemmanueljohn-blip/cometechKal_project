from django.contrib import admin
from .models import ContactRequest, NewsletterSubscription, Service, Testimonial

@admin.register(ContactRequest)
class ContactRequestAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'email', 'service_type', 'status', 'created_at']
    list_filter = ['status', 'service_type', 'created_at']
    search_fields = ['first_name', 'last_name', 'email', 'company']
    readonly_fields = ['created_at', 'updated_at']
    fieldsets = (
        ('Informations personnelles', {
            'fields': ('first_name', 'last_name', 'email', 'phone', 'company')
        }),
        ('Demande', {
            'fields': ('service_type', 'message', 'budget')
        }),
        ('Suivi', {
            'fields': ('status', 'created_at', 'updated_at')
        }),
    )


@admin.register(NewsletterSubscription)
class NewsletterSubscriptionAdmin(admin.ModelAdmin):
    list_display = ['email', 'created_at', 'is_active']
    list_filter = ['is_active', 'created_at']
    search_fields = ['email']


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['name', 'order', 'is_active']
    list_filter = ['is_active']
    search_fields = ['name']


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['author', 'company', 'rating', 'is_active', 'created_at']
    list_filter = ['is_active', 'rating']
    search_fields = ['author', 'company']