from django.urls import path
from .views import (
    ContactRequestCreate,
    ServiceList,
    TestimonialList,
    NewsletterSubscribe,
    ContactRequestList
)

urlpatterns = [
    path('contact/', ContactRequestCreate.as_view(), name='contact-create'),
    path('services/', ServiceList.as_view(), name='services-list'),
    path('testimonials/', TestimonialList.as_view(), name='testimonials-list'),
    path('newsletter/', NewsletterSubscribe.as_view(), name='newsletter-subscribe'),
    path('admin/contacts/', ContactRequestList.as_view(), name='admin-contacts'),
]