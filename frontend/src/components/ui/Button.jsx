import React from 'react'
import { Loader2 } from 'lucide-react'

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  ...props
}) => {
  const variants = {
    primary: 'bg-gold hover:bg-gold-light text-dark font-semibold',
    secondary: 'border-2 border-gold text-gold hover:bg-gold hover:text-dark',
    dark: 'bg-dark-card border border-gold/20 text-white hover:border-gold/50',
    ghost: 'text-gold hover:text-gold-light hover:bg-gold/10',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        rounded-full font-medium transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:scale-[1.02] active:scale-[0.98]
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Chargement...
        </>
      ) : (
        children
      )}
    </button>
  )
}

export default Button