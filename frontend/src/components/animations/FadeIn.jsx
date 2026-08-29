import React, { useEffect, useRef, useState } from 'react'

/**
 * Composant d'animation fade-in au scroll
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenu à animer
 * @param {string} props.direction - Direction de l'animation : 'up', 'down', 'left', 'right'
 * @param {number} props.delay - Délai en ms avant le début de l'animation
 * @param {number} props.duration - Durée de l'animation en ms
 * @param {number} props.threshold - Seuil de visibilité (0-1)
 * @param {string} props.className - Classes CSS supplémentaires
 * @param {string} props.triggerOnce - Ne déclencher qu'une seule fois
 */
const FadeIn = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 800,
  threshold = 0.1,
  className = '',
  triggerOnce = true,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  // Directions de transformation
  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up':
          return 'translateY(30px)'
        case 'down':
          return 'translateY(-30px)'
        case 'left':
          return 'translateX(30px)'
        case 'right':
          return 'translateX(-30px)'
        case 'scale':
          return 'scale(0.95)'
        default:
          return 'translateY(30px)'
      }
    }
    return 'translate(0) scale(1)'
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current)
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, triggerOnce])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
        transitionDelay: `${delay}ms`,
        willChange: 'transform, opacity',
        ...props.style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export default FadeIn