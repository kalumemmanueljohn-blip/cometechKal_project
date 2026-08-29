from django.db import models

class ContactRequest(models.Model):
    """Modèle pour les demandes de devis et de contact"""
    STATUS_CHOICES = [
        ('new', 'Nouveau'),
        ('read', 'Lu'),
        ('contacted', 'Contacté'),
        ('converted', 'Converti'),
        ('archived', 'Archivé'),
    ]

    first_name = models.CharField(max_length=100, verbose_name="Prénom")
    last_name = models.CharField(max_length=100, verbose_name="Nom")
    email = models.EmailField(verbose_name="Email")
    phone = models.CharField(max_length=50, blank=True, verbose_name="Téléphone")
    company = models.CharField(max_length=200, blank=True, verbose_name="Entreprise")
    service_type = models.CharField(
        max_length=50,
        choices=[
            ('statistique', 'Site statistique'),
            ('dynamique', 'Site dynamique'),
            ('desktop', 'Application desktop'),
            ('autre', 'Autre'),
        ],
        verbose_name="Type de service"
    )
    message = models.TextField(verbose_name="Message")
    budget = models.CharField(max_length=100, blank=True, verbose_name="Budget estimé")
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='new',
        verbose_name="Statut"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Demande de contact"
        verbose_name_plural = "Demandes de contact"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.created_at.strftime('%d/%m/%Y')}"

    def full_name(self):
        return f"{self.first_name} {self.last_name}"
    
    def save(self, *args, **kwargs):
        # Nettoyer les données avant sauvegarde
        from .serializers import clean_text
        self.first_name = clean_text(self.first_name)
        self.last_name = clean_text(self.last_name)
        self.email = clean_text(self.email)
        self.phone = clean_text(self.phone)
        self.company = clean_text(self.company) if self.company else ""
        self.message = clean_text(self.message)
        self.budget = clean_text(self.budget) if self.budget else ""
        super().save(*args, **kwargs)


class NewsletterSubscription(models.Model):
    email = models.EmailField(unique=True, verbose_name="Email")
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Abonné newsletter"
        verbose_name_plural = "Abonnés newsletter"

    def __str__(self):
        return self.email


class Service(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nom")
    description = models.TextField(verbose_name="Description")
    icon_name = models.CharField(max_length=50, verbose_name="Nom de l'icône (Lucide)")
    features = models.JSONField(default=list, blank=True, verbose_name="Fonctionnalités")
    order = models.PositiveIntegerField(default=0, verbose_name="Ordre")
    is_active = models.BooleanField(default=True, verbose_name="Actif")

    class Meta:
        verbose_name = "Service"
        verbose_name_plural = "Services"
        ordering = ['order']

    def __str__(self):
        return self.name


class Testimonial(models.Model):
    content = models.TextField(verbose_name="Témoignage")
    author = models.CharField(max_length=100, verbose_name="Auteur")
    position = models.CharField(max_length=100, blank=True, verbose_name="Poste")
    company = models.CharField(max_length=100, blank=True, verbose_name="Entreprise")
    rating = models.PositiveSmallIntegerField(default=5, verbose_name="Note (1-5)")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Témoignage"
        verbose_name_plural = "Témoignages"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.author} - {self.company}"