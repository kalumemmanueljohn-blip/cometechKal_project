/**
 * Constantes globales de l'application
 */

// Couleurs de la marque
export const COLORS = {
  dark: '#0a0e17',
  darkLight: '#141b2b',
  darkMedium: '#1a2335',
  darkCard: '#1e2842',
  gold: '#d4a853',
  goldLight: '#e8c170',
  goldDark: '#b8923f',
  white: '#ffffff',
  gray: {
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
  },
}

// Typographie
export const TYPOGRAPHY = {
  fonts: {
    sans: "'Inter', system-ui, sans-serif",
    display: "'Poppins', 'Inter', sans-serif",
  },
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
  },
}

// Navigation
export const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Engagements', href: '#engagements' },
  { label: 'Processus', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

// Services (fallback si API indisponible)
export const DEFAULT_SERVICES = [
  {
    id: 1,
    name: 'Sites Statistiques',
    description:
      'Tableaux de bord interactifs, graphiques dynamiques et analyses en temps réel pour piloter vos données.',
    icon: 'BarChart3',
    features: ['Visualisation avancée', 'Export de rapports', 'Alertes personnalisées'],
  },
  {
    id: 2,
    name: 'Sites Dynamiques',
    description:
      "Plates-formes évolutives avec gestion de contenu, authentification sécurisée et CRUD complet.",
    icon: 'Code2',
    features: ['Admin panel', 'API REST', 'Gestion utilisateurs'],
  },
  {
    id: 3,
    name: 'Applications Desktop',
    description:
      'Solutions performantes pour Windows, développées avec les technologies modernes.',
    icon: 'Monitor',
    features: ['Interface native', 'Hors-ligne', 'Sécurité renforcée'],
  },
]

// Engagements
export const ENGAGEMENTS = [
  {
    icon: 'Smartphone',
    title: '100% Responsive',
    description: 'Compatible mobile, tablette et desktop pour une expérience optimale partout.',
  },
  {
    icon: 'Shield',
    title: 'Sécurisé & Fiable',
    description: 'Données protégées, sauvegardes régulières et architecture robuste.',
  },
  {
    icon: 'Rocket',
    title: 'Rapide & Optimisé',
    description: 'Sites et applications ultra-performants avec des temps de chargement réduits.',
  },
  {
    icon: 'Database',
    title: 'Technologies Modernes',
    description: 'Django, React, Python, PHP, JavaScript, MySQL, PostgreSQL et plus.',
  },
  {
    icon: 'Headphones',
    title: 'Support & Maintenance',
    description: 'Accompagnement personnalisé et maintenance continue pour votre sérénité.',
  },
]

// Audience cible
export const AUDIENCES = [
  {
    icon: 'Building2',
    label: 'Entreprises & PME',
    description: 'Digitalisez vos processus et boostez votre croissance.',
  },
  {
    icon: 'Globe',
    label: 'Institutions & ONG',
    description: 'Des solutions adaptées à vos missions et enjeux sociaux.',
  },
  {
    icon: 'Store',
    label: 'Commerçants',
    description: 'Augmentez votre visibilité et optimisez votre gestion.',
  },
  {
    icon: 'Lightbulb',
    label: 'Startups & Entrepreneurs',
    description: 'Accélérez votre lancement avec des outils digitaux performants.',
  },
  {
    icon: 'User',
    label: 'Particuliers',
    description: 'Des solutions personnalisées pour vos projets personnels.',
  },
]

// Garanties
export const GUARANTEES = [
  {
    icon: 'FileText',
    title: 'Devis gratuit',
    description: 'Une estimation précise et sans engagement pour votre projet.',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    icon: 'Clock',
    title: 'Délais respectés',
    description: "Nous nous engageons à livrer vos projets dans les temps convenus.",
    color: 'from-gold to-gold-light',
  },
  {
    icon: 'Star',
    title: 'Satisfaction garantie',
    description: "Nous restons à votre écoute jusqu'à ce que vous soyez pleinement satisfait.",
    color: 'from-purple-500 to-pink-500',
  },
]

// Processus en 3 étapes
export const PROCESS_STEPS = [
  {
    icon: 'TrendingUp',
    title: 'Analysez',
    description:
      'Nous étudions vos besoins, vos données et vos objectifs pour définir la stratégie optimale.',
    number: '01',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    icon: 'Target',
    title: 'Décidez',
    description:
      'Ensemble, nous validons les choix techniques et fonctionnels pour concrétiser votre vision.',
    number: '02',
    color: 'from-gold to-gold-light',
  },
  {
    icon: 'BarChart3',
    title: 'Progressez',
    description:
      'Nous développons, testons et déployons votre solution pour vous faire progresser durablement.',
    number: '03',
    color: 'from-purple-500 to-pink-500',
  },
]

// Coordonnées de contact
export const CONTACT_INFO = [
  {
    icon: 'Phone',
    label: 'Téléphone',
    value: '+243 859 323 184',
    secondary: '+243 830 360 200',
    href: 'tel:+243859323184',
  },
  {
    icon: 'Mail',
    label: 'Email',
    value: 'kalumemmaueljohn@gmail.com',
    href: 'mailto:kalumemmaueljohn@gmail.com',
  },
  {
    icon: 'MapPin',
    label: 'Localisation',
    value: 'Kinshasa, RDC',
    secondary: 'Nous travaillons partout !',
  },
]

// Réseaux sociaux
export const SOCIAL_LINKS = [
  { icon: 'Facebook', href: '#', label: 'Facebook' },
  { icon: 'Twitter', href: '#', label: 'Twitter' },
  { icon: 'Linkedin', href: '#', label: 'LinkedIn' },
  { icon: 'Youtube', href: '#', label: 'YouTube' },
]

// Metadonnées SEO
export const SEO = {
  title: 'CometechKal - Agence de solutions digitales',
  description:
    'Sites statistiques, sites dynamiques et applications desktop sur mesure. Transformez vos données en décisions stratégiques.',
  keywords:
    'digital, sites web, applications, données, statistiques, dynamique, performance, Kinshasa, RDC',
  author: 'CometechKal',
  url: 'https://cometechkal.com',
  image: '/og-image.png',
}

// Variables d'environnement
export const ENV = {
  API_URL: import.meta.env.VITE_API_URL || '/api/v1',
  APP_URL: import.meta.env.VITE_APP_URL || 'http://localhost:3000',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
}

export default {
  COLORS,
  TYPOGRAPHY,
  NAV_LINKS,
  DEFAULT_SERVICES,
  ENGAGEMENTS,
  AUDIENCES,
  GUARANTEES,
  PROCESS_STEPS,
  CONTACT_INFO,
  SOCIAL_LINKS,
  SEO,
  ENV,
}