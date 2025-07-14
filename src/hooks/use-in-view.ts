
"use client";

import { useState, useEffect, useRef } from 'react';

/**
 * Opciones para el IntersectionObserver.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver
 */
interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
}

/**
 * Hook personalizado para detectar cuándo un elemento está en el viewport.
 * @param {IntersectionObserverOptions} options - Opciones para el IntersectionObserver.
 * @returns {[React.RefObject<any>, boolean]} - Un array con la ref para el elemento y un booleano que indica si está en vista.
 */
export const useInView = (options: IntersectionObserverOptions = {}): [React.RefObject<any>, boolean] => {
  const { root = null, rootMargin = '0px', threshold = 0.1, triggerOnce = true } = options;
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Si solo queremos que se active una vez, dejamos de observar.
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else {
            // Si triggerOnce es falso, podemos resetear el estado cuando sale de la vista.
            if(!triggerOnce){
                setIsInView(false)
            }
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(element);

    // Limpieza al desmontar el componente.
    return () => {
      observer.disconnect();
    };
  }, [ref, root, rootMargin, threshold, triggerOnce]);

  return [ref, isInView];
};
