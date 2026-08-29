from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags
import logging
import re

logger = logging.getLogger(__name__)

def clean_text(text):
    """Nettoie le texte des caractères spéciaux - Version définitive"""
    if not text:
        return ""
    if not isinstance(text, str):
        text = str(text)
    
    # 1. Remplacer les espaces insécables et caractères invisibles
    replacements = {
        '\xa0': ' ',    # Espace insécable (NBSP)
        '\u202f': ' ',  # Espace fin insécable
        '\u200b': '',   # Espace de largeur nulle
        '\u200c': '',   # ZWNJ
        '\u200d': '',   # ZWJ
        '\u200e': '',   # Marque de gauche à droite
        '\u200f': '',   # Marque de droite à gauche
        '\u2013': '-',  # Tiret long
        '\u2014': '--', # Tiret très long
        '\u2018': "'",  # Apostrophe courbe gauche
        '\u2019': "'",  # Apostrophe courbe droite
        '\u201c': '"',  # Guillemet gauche
        '\u201d': '"',  # Guillemet droit
        '\u00ab': '"',  # Guillemet français gauche
        '\u00bb': '"',  # Guillemet français droit
    }
    
    for old, new in replacements.items():
        text = text.replace(old, new)
    
    # 2. Supprimer tous les caractères non-ASCII (pour le sujet)
    # 3. Garder uniquement les caractères ASCII pour le sujet
    ascii_text = text.encode('ascii', 'ignore').decode('ascii')
    
    # 4. Nettoyer les espaces multiples
    ascii_text = re.sub(r'\s+', ' ', ascii_text)
    
    return ascii_text.strip()

def clean_text_full(text):
    """Nettoie le texte pour le contenu (garder les accents)"""
    if not text:
        return ""
    if not isinstance(text, str):
        text = str(text)
    
    # Remplacer les caractères spéciaux (garder les accents pour le contenu)
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
        '\u00ab': '"',  # Guillemet français gauche
        '\u00bb': '"',  # Guillemet français droit
    }
    
    for old, new in replacements.items():
        text = text.replace(old, new)
    
    return text.strip()

def send_contact_email(contact_data):
    """Envoie un email de confirmation pour une demande de contact"""
    
    # Vérifier si l'email est configuré
    if not settings.EMAIL_HOST_USER or not settings.EMAIL_HOST_PASSWORD:
        logger.warning("Email non configuré. Aucun email envoyé.")
        return
    
    try:
        # Nettoyer les données (sujet en ASCII)
        cleaned_data = {}
        for key, value in contact_data.items():
            if isinstance(value, str):
                if key in ['first_name', 'last_name', 'email', 'phone', 'company', 'service_type', 'budget']:
                    # Pour le sujet, nettoyage complet
                    cleaned_data[key] = clean_text(value)
                else:
                    # Pour le message, garder les accents
                    cleaned_data[key] = clean_text_full(value)
            else:
                cleaned_data[key] = value
        
        # ===== CONSTRUCTION DU SUJET AVEC VÉRIFICATION =====
        sujet = f"Nouvelle demande de devis - {cleaned_data.get('first_name', '')} {cleaned_data.get('last_name', '')}"
        # Nettoyage définitif du sujet
        sujet = clean_text(sujet)
        # Si le sujet est vide, utiliser un sujet par défaut
        if not sujet or len(sujet.strip()) == 0:
            sujet = "Nouvelle demande de devis - Cometech"
        # S'assurer que le sujet ne contient que des caractères ASCII
        sujet = sujet.encode('ascii', 'ignore').decode('ascii')

        # ===== CONTENU DU MESSAGE =====
        # Utiliser les données nettoyées (avec accents pour le contenu)
        context = {
            'first_name': cleaned_data.get('first_name', ''),
            'last_name': cleaned_data.get('last_name', ''),
            'email': cleaned_data.get('email', ''),
            'phone': cleaned_data.get('phone', ''),
            'company': cleaned_data.get('company', ''),
            'service_type': cleaned_data.get('service_type', ''),
            'message': cleaned_data.get('message', ''),
            'budget': cleaned_data.get('budget', ''),
            'created_at': cleaned_data.get('created_at', ''),
        }

        # Email pour l'admin
        admin_message = render_to_string('admin_contact_email.html', context)
        admin_text = strip_tags(admin_message)
        
        msg = EmailMultiAlternatives(
            subject=sujet,
            body=admin_text,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[settings.EMAIL_HOST_USER],
        )
        msg.attach_alternative(admin_message, "text/html")
        msg.send(fail_silently=False)

        # Email de confirmation pour le client
        client_subject = "Votre demande de devis - Cometech"
        client_message = render_to_string('client_confirmation_email.html', context)
        client_text = strip_tags(client_message)

        msg_client = EmailMultiAlternatives(
            subject=client_subject,
            body=client_text,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[cleaned_data.get('email', '')],
        )
        msg_client.attach_alternative(client_message, "text/html")
        msg_client.send(fail_silently=False)
        
        logger.info(f"Email envoyé avec succès à {cleaned_data.get('email', '')}")
        
    except Exception as e:
        logger.error(f"Erreur d'envoi d'email: {str(e)}")
        # On continue même si l'email échoue