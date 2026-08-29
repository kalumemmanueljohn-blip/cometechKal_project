import { useEffect, useRef, useState } from 'react'

/**
 * Hook personnalisé pour observer l'entrée en viewport d'un élément
 * @param {Object} options - Options de l'IntersectionObserver
 * @param {number} options.threshold - Seuil de visibilité (0-1)
 * @param {string} options.rootMargin - Marge du root
 * @param {boolean} options.triggerOnce - Ne déclencher qu'une seule fois
 * @param {Element} options.root - Élément root
 * @returns {Array} [ref, isVisible, entry]
 */
const useIntersectionObserver = ({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
  root = null,
} = {}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [entry, setEntry] = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry)
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce && node) {
            observer.unobserve(node)
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin,
        root,
      }
    )

    observer.observe(node)

    return () => {
      if (node) {
        observer.unobserve(node)
      }
    }
  }, [threshold, rootMargin, triggerOnce, root])

  return [ref, isVisible, entry]
}

export default useIntersectionObserver