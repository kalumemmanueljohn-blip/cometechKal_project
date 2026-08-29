import React from 'react'

/**
 * Composant Badge
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} props.variant - 'gold' | 'success' | 'error' | 'info' | 'dark'
 * @param {string} props.size - 'sm' | 'md'
 * @param {React.ReactNode} props.icon - Icône optionnelle
 */
const Badge = ({
  children,
  variant = 'gold',
  size = 'md',
  icon = null,
  className = '',
  ...props
}) => {
  const variants = {
    gold: 'bg-gold/10 text-gold border border-gold/20',
    success: 'bg-green-500/10 text-green-400 border border-green-500/20',
    error: 'bg-red-500/10 text-red-400 border border-red-500/20',
    info: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    dark: 'bg-dark/50 text-gray-300 border border-gray-700',
  }

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-4 py-1.5 text-sm',
  }

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full font-medium
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  )
}

export default Badge