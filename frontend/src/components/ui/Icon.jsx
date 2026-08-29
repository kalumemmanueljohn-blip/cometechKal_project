import React from 'react'
import * as LucideIcons from 'lucide-react'

/**
 * Composant Icone dynamique
 * @param {Object} props
 * @param {string} props.name - Nom de l'icône Lucide (ex: 'Zap', 'Shield')
 * @param {string} props.size - Taille: 'sm' | 'md' | 'lg' | 'xl'
 * @param {string} props.color - Couleur de l'icône
 * @param {string} props.className
 */
const Icon = ({
  name,
  size = 'md',
  color = 'currentColor',
  className = '',
  ...props
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
    '2xl': 'w-10 h-10',
  }

  // Récupération dynamique de l'icône
  const IconComponent = LucideIcons[name]

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in lucide-react`)
    return null
  }

  return (
    <IconComponent
      className={`${sizes[size]} ${className}`}
      color={color}
      {...props}
    />
  )
}

export default Icon