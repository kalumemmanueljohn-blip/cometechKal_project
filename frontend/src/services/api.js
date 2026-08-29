import axios from 'axios'

// Configuration de base
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
})

// Intercepteur pour gérer les erreurs
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Erreur serveur avec réponse
      console.error('API Error:', error.response.status, error.response.data)
    } else if (error.request) {
      // Erreur réseau
      console.error('Network Error:', error.request)
    } else {
      // Autre erreur
      console.error('Error:', error.message)
    }
    return Promise.reject(error)
  }
)

// Services API
export const contactService = {
  /**
   * Envoyer une demande de contact/devis
   * @param {Object} data - Données du formulaire
   * @returns {Promise}
   */
  sendContact: async (data) => {
    try {
      const response = await apiClient.post('/contact/', data)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Erreur de communication' }
    }
  },
}

export const serviceService = {
  /**
   * Récupérer la liste des services
   * @returns {Promise}
   */
  getServices: async () => {
    try {
      const response = await apiClient.get('/services/')
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Erreur de chargement des services' }
    }
  },
}

export const testimonialService = {
  /**
   * Récupérer les témoignages
   * @returns {Promise}
   */
  getTestimonials: async () => {
    try {
      const response = await apiClient.get('/testimonials/')
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Erreur de chargement des témoignages' }
    }
  },
}

export const newsletterService = {
  /**
   * S'abonner à la newsletter
   * @param {string} email
   * @returns {Promise}
   */
  subscribe: async (email) => {
    try {
      const response = await apiClient.post('/newsletter/', { email })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: "Erreur d'abonnement" }
    }
  },
}

// Export pour utilisation directe
export default {
  contact: contactService,
  services: serviceService,
  testimonials: testimonialService,
  newsletter: newsletterService,
}