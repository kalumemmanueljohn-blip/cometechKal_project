import { NestFactory } from '@nestjs/core';
import { Module, Controller, Get, Post, Body } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

// ========================================
// DONNÉES
// ========================================

const services = [
  { id: 1, name: 'Sites Statistiques', description: 'Tableaux de bord interactifs' },
  { id: 2, name: 'Sites Dynamiques', description: 'Plates-formes évolutives' },
  { id: 3, name: 'Applications Desktop', description: 'Solutions performantes' },
];

const statistics = [
  { label: 'Utilisateurs', value: 12458, growth: '+18.2%' },
  { label: 'Visites', value: 35782, growth: '+9.7%' },
  { label: 'Revenus', value: 8540, growth: '+12.1%' },
  { label: 'Commandes', value: 1256, growth: '+6.5%' },
];

let contacts: any[] = [];

// ========================================
// CONFIGURATION EMAIL - GMAIL DIRECT
// ========================================

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'kalumemmanueljohn@gmail.com',
    pass: 'nmbdltnqdyvcqwdz',  // ← Ton mot de passe d'application (sans espaces)
  },
});

// Vérifier la connexion
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Erreur de connexion email:', error);
  } else {
    console.log('✅ Serveur email connecté avec succès !');
  }
});

// ========================================
// FONCTION D'ENVOI D'EMAIL
// ========================================

async function sendEmail(to: string, subject: string, html: string, text?: string) {
  try {
    const info = await transporter.sendMail({
      from: 'kalumemmanueljohn@gmail.com',
      to: to,
      subject: subject,
      text: text || html.replace(/<[^>]*>/g, ''),
      html: html,
    });
    
    console.log(`📧 Email envoyé à ${to}`);
    console.log(`📧 Message ID: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error('❌ Erreur d\'envoi email:', error);
    return false;
  }
}

// ========================================
// TEMPLATES EMAIL
// ========================================

function getAdminEmailTemplate(data: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0a0e17; padding: 20px; color: #d4a853; text-align: center; }
        .content { background: #f5f5f5; padding: 30px; }
        .field { margin-bottom: 10px; }
        .label { font-weight: bold; color: #0a0e17; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .badge { background: #d4a853; color: #fff; padding: 4px 12px; border-radius: 20px; display: inline-block; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔔 Nouvelle demande de devis</h1>
          <p>Cometech - Solutions Digitales</p>
        </div>
        <div class="content">
          <p><span class="badge">Nouveau</span></p>
          
          <h3>👤 Informations personnelles</h3>
          <div class="field"><span class="label">Prénom :</span> ${data.firstName || 'Non renseigné'}</div>
          <div class="field"><span class="label">Nom :</span> ${data.lastName || 'Non renseigné'}</div>
          <div class="field"><span class="label">Email :</span> ${data.email || 'Non renseigné'}</div>
          <div class="field"><span class="label">Téléphone :</span> ${data.phone || 'Non renseigné'}</div>
          
          <hr>
          
          <h3>💼 Détails du projet</h3>
          <div class="field"><span class="label">Service souhaité :</span> ${data.serviceType || 'Non renseigné'}</div>
          <div class="field"><span class="label">Message :</span></div>
          <p style="background: #fff; padding: 15px; border-radius: 8px; border-left: 4px solid #d4a853;">
            ${data.message || 'Aucun message'}
          </p>
          
          <hr>
          <p style="font-size: 14px; color: #666;">Reçu le : ${new Date().toLocaleString('fr-FR')}</p>
        </div>
        <div class="footer">
          <p>Cometech - Données. Dynamique. Performance.</p>
          <p>Kinshasa, RDC | +243 859 323 184</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function getClientEmailTemplate(data: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0a0e17; padding: 30px; text-align: center; }
        .header h1 { color: #d4a853; margin: 0; }
        .header p { color: #888; margin: 5px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 8px; }
        .message-box { background: #fff; padding: 20px; border-radius: 8px; border-left: 4px solid #d4a853; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .contact-box { background: #f0f0f0; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .btn { display: inline-block; background: #d4a853; color: #fff; padding: 12px 30px; border-radius: 30px; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✨ Cometech</h1>
          <p>Données. Dynamique. Performance.</p>
        </div>
        <div class="content">
          <h2>Bonjour ${data.firstName || ''} ${data.lastName || ''},</h2>
          
          <p>Nous avons bien reçu votre demande de devis pour un projet de <strong>${data.serviceType || 'service'}</strong>.</p>
          
          <div class="message-box">
            <p><strong>📋 Récapitulatif de votre demande :</strong></p>
            <p><strong>Service :</strong> ${data.serviceType || 'Non spécifié'}</p>
            <p><strong>Message :</strong></p>
            <p style="font-style: italic; color: #555;">"${data.message || 'Aucun message'}"</p>
          </div>

          <p>Notre équipe va analyser votre demande dans les plus brefs délais. 
          Nous vous contacterons sous <strong>48 heures</strong>.</p>

          <p style="text-align: center; margin: 30px 0;">
            <a href="https://cometech.com" class="btn">Visiter notre site</a>
          </p>

          <div class="contact-box">
            <p style="margin: 0;"><strong>📞 Contact rapide :</strong></p>
            <p style="margin: 5px 0;">+243 859 323 184</p>
            <p style="margin: 0;">kalumemmanueljohn@gmail.com</p>
          </div>

          <p style="margin-top: 20px; color: #666;">
            Nous avons hâte de collaborer avec vous !
          </p>
        </div>
        <div class="footer">
          <p>© 2026 Cometech - Tous droits réservés</p>
          <p>Kinshasa, République Démocratique du Congo</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// ========================================
// CONTROLLEURS
// ========================================

@Controller('services')
export class ServicesController {
  @Get()
  findAll() {
    return services;
  }
}

@Controller('contact')
export class ContactController {
  @Post()
  async create(@Body() body: any) {
    const newContact = { 
      id: contacts.length + 1, 
      ...body, 
      createdAt: new Date() 
    };
    contacts.push(newContact);
    
    // === ENVOYER LES EMAILS ===
    
    // 1. Email à l'administrateur
    const adminHtml = getAdminEmailTemplate(body);
    await sendEmail(
      'kalumemmanueljohn@gmail.com',
      `🔔 Nouvelle demande de devis - ${body.firstName || ''} ${body.lastName || ''}`,
      adminHtml
    );
    
    // 2. Email de confirmation au client
    if (body.email) {
      const clientHtml = getClientEmailTemplate(body);
      await sendEmail(
        body.email,
        '📩 Confirmation de votre demande - Cometech',
        clientHtml
      );
    }
    
    return { 
      success: true, 
      message: 'Votre demande a été envoyée avec succès ! Nous vous contacterons sous 48h.',
      data: newContact 
    };
  }
}

@Controller('statistics')
export class StatisticsController {
  @Get()
  findAll() {
    return statistics;
  }
}

// ========================================
// MODULE PRINCIPAL
// ========================================

@Module({
  controllers: [ServicesController, ContactController, StatisticsController],
})
export class AppModule {}

// ========================================
// LANCEMENT
// ========================================

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  await app.listen(3001);
  console.log('🚀 Backend running on http://localhost:3001');
  console.log('📧 Service email activé (Gmail)');
}

bootstrap();