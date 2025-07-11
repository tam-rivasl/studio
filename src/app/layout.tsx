// Importaciones de tipos y componentes necesarios.
import type { Metadata } from "next";
import "./globals.css"; // Estilos globales de la aplicación.
import { ThemeProvider } from "@/components/providers/theme-provider"; // Proveedor de temas (claro/oscuro).
import { Toaster } from "@/components/ui/toaster"; // Componente para mostrar notificaciones (toasts).

// Metadatos de la página, importantes para SEO y para cómo se muestra en el navegador.
export const metadata: Metadata = {
  title: "CV Enigma",
  description: "An interactive and dynamic curriculum vitae.",
};

/**
 * RootLayout es el componente de diseño principal que envuelve toda la aplicación.
 * @param {object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Componentes hijos que serán renderizados dentro de este diseño.
 * @returns {JSX.Element} El elemento JSX que representa el diseño raíz.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Se define el HTML con el idioma y se suprime una advertencia de hidratación.
    <html lang="en" suppressHydrationWarning>
      <head />
      {/* El cuerpo de la página con una clase para antialiasing para un texto más suave. */}
      <body className="antialiased">
        {/* ThemeProvider envuelve a los hijos para darles acceso al contexto del tema. */}
        <ThemeProvider
          attribute="class" // El tema se aplicará como una clase en el elemento HTML.
          defaultTheme="system" // Tema por defecto según el sistema operativo.
          enableSystem // Permite cambiar el tema según la configuración del sistema.
          disableTransitionOnChange // Deshabilita la transición al cambiar de tema para evitar parpadeos.
        >
          {children} {/* Renderiza los componentes hijos. */}
          <Toaster /> {/* Componente para mostrar notificaciones globales. */}
        </ThemeProvider>
      </body>
    </html>
  );
}
