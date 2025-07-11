// Importa las dependencias necesarias: clsx para construir clases condicionalmente y tailwind-merge para fusionar clases de Tailwind CSS sin conflictos.
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Función de utilidad para combinar clases de CSS de forma segura y eficiente.
 * Permite aplicar clases condicionalmente y resuelve conflictos de clases de Tailwind.
 * Por ejemplo, cn("p-4", "p-2") resultará en "p-2", ya que es la última clase de padding que se aplica.
 * 
 * @param {...ClassValue[]} inputs - Una secuencia de valores de clase. Pueden ser strings, objetos o arrays.
 * @returns {string} Una cadena de texto con las clases de CSS combinadas y optimizadas.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
