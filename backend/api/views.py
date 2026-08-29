from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import ContactRequest, Service, Testimonial, NewsletterSubscription
from .serializers import (
    ContactRequestSerializer,
    ServiceSerializer,
    TestimonialSerializer,
    NewsletterSubscriptionSerializer
)
from .utils import send_contact_email, clean_text
import logging

logger = logging.getLogger(__name__)

class ContactRequestCreate(generics.CreateAPIView):
    """API pour créer une demande de contact/devis"""
    queryset = ContactRequest.objects.all()
    serializer_class = ContactRequestSerializer

    def create(self, request, *args, **kwargs):
        try:
            # Nettoyer les données d'entrée
            cleaned_data = {}
            for key, value in request.data.items():
                if isinstance(value, str):
                    cleaned_data[key] = clean_text(value)
                else:
                    cleaned_data[key] = value
            
            serializer = self.get_serializer(data=cleaned_data)
            serializer.is_valid(raise_exception=True)

            # Sauvegarder la demande
            self.perform_create(serializer)

            # Envoyer les emails (sans bloquer si erreur)
            try:
                send_contact_email(serializer.data)
            except Exception as e:
                logger.error(f"Erreur d'envoi d'email: {str(e)}")
                # On continue même si l'email échoue

            headers = self.get_success_headers(serializer.data)
            return Response(
                {
                    'success': True,
                    'message': 'Votre demande a été envoyée avec succès. Nous vous contacterons dans les plus brefs délais.',
                    'data': serializer.data
                },
                status=status.HTTP_201_CREATED,
                headers=headers
            )
        except Exception as e:
            logger.error(f"Erreur lors du traitement: {str(e)}")
            return Response(
                {
                    'success': False,
                    'message': 'Une erreur est survenue. Veuillez réessayer.'
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ServiceList(generics.ListAPIView):
    """Liste des services disponibles"""
    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceSerializer


class TestimonialList(generics.ListAPIView):
    """Liste des témoignages"""
    queryset = Testimonial.objects.filter(is_active=True)
    serializer_class = TestimonialSerializer


class NewsletterSubscribe(generics.CreateAPIView):
    """Abonnement à la newsletter"""
    queryset = NewsletterSubscription.objects.all()
    serializer_class = NewsletterSubscriptionSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {
                'success': True,
                'message': 'Merci pour votre abonnement !'
            },
            status=status.HTTP_201_CREATED
        )


class ContactRequestList(generics.ListAPIView):
    """Liste des demandes de contact (admin)"""
    queryset = ContactRequest.objects.all()
    serializer_class = ContactRequestSerializer