from rest_framework import serializers
from .models import ContactRequest, NewsletterSubscription, Service, Testimonial
import re

def clean_text(text):
    """Nettoie le texte des caractères spéciaux - Version définitive"""
    if not text:
        return ""
    if not isinstance(text, str):
        text = str(text)
    
    replacements = {
        '\xa0': ' ',    # Espace insécable
        '\u202f': ' ',  # Espace fin insécable
        '\u200b': '',   # Espace de largeur nulle
        '\u200c': '',   # ZWNJ
        '\u200d': '',   # ZWJ
        '\u2013': '-',  # Tiret long
        '\u2014': '--', # Tiret très long
        '\u2018': "'",  # Apostrophe courbe gauche
        '\u2019': "'",  # Apostrophe courbe droite
        '\u201c': '"',  # Guillemet gauche
        '\u201d': '"',  # Guillemet droit
    }
    
    for old, new in replacements.items():
        text = text.replace(old, new)
    
    # Supprimer les espaces multiples
    text = re.sub(r'\s+', ' ', text)
    
    return text.strip()

class ContactRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactRequest
        fields = [
            'id', 'first_name', 'last_name', 'email', 'phone',
            'company', 'service_type', 'message', 'budget',
            'status', 'created_at'
        ]
        read_only_fields = ['id', 'status', 'created_at', 'updated_at']

    def validate_email(self, value):
        if not value or '@' not in value:
            raise serializers.ValidationError("Email invalide")
        return clean_text(value)
    
    def validate_first_name(self, value):
        return clean_text(value)
    
    def validate_last_name(self, value):
        return clean_text(value)
    
    def validate_phone(self, value):
        return clean_text(value)
    
    def validate_message(self, value):
        return clean_text(value)
    
    def validate_company(self, value):
        return clean_text(value) if value else ""
    
    def validate_budget(self, value):
        return clean_text(value) if value else ""
    
    def validate(self, data):
        cleaned_data = {}
        for key, value in data.items():
            if isinstance(value, str):
                cleaned_data[key] = clean_text(value)
            else:
                cleaned_data[key] = value
        return cleaned_data
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        for key, value in data.items():
            if isinstance(value, str):
                data[key] = clean_text(value)
        return data


class NewsletterSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscription
        fields = ['id', 'email', 'created_at', 'is_active']
        read_only_fields = ['id', 'created_at', 'is_active']


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'description', 'icon_name', 'features', 'order', 'is_active']


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'content', 'author', 'position', 'company', 'rating', 'created_at']