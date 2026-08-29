import React from 'react'

/**
 * Composant Card réutilisable
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} props.variant - 'default' | 'glow' | 'gradient' | 'dark'
 * @param {boolean} props.hoverable - Effet au survol
 * @param {boolean} props.clickable - Effet clic
 * @param {string} props.className
 */
const Card = ({
  children,
  variant = 'default',
  hoverable = false,
  clickable = false,
  className = '',
  ...props
}) => {
  const variants = {
    default: 'bg-dark-card border border-gold/10',
    glow: 'bg-dark-card border border-gold/20 shadow-[0_0_30px_rgba(212,168,83,0.05)]',
    gradient: 'bg-gradient-to-br from-dark-card to-dark-light border border-gold/10',
    dark: 'bg-dark/50 border border-gold/5',
  }

  return (
    <div
      className={`
        rounded-2xl p-6
        transition-all duration-300
        ${variants[variant]}
        ${hoverable ? 'hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(212,168,83,0.08)] hover:border-gold/30' : ''}
        ${clickable ? 'cursor-pointer active:scale-[0.98]' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card