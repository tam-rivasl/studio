
# CV Enigma - Currículum Interactivo y Dinámico

Bienvenido a CV Enigma, un proyecto de currículum vitae (CV) de código abierto, interactivo y personalizable, construido con las últimas tecnologías web. Este proyecto no solo muestra tu información profesional de una manera moderna y elegante, sino que también está diseñado para ser funcional y accesible.

![Captura de pantalla de la aplicación](https://placehold.co/800x400.png)

## ✨ Características Principales

- **🎨 Diseño Moderno y Profesional**: Una interfaz limpia y atractiva construida con Next.js, ShadCN UI y Tailwind CSS.
- **🌗 Modo Claro y Oscuro**: Permite a los usuarios cambiar entre temas visuales según su preferencia.
- **🌐 Soporte Multilingüe**: El contenido del CV está disponible en varios idiomas (Español, Inglés, Francés, Alemán y Portugués) y es fácilmente extensible.
- **🚀 Paleta de Comandos**: Accede rápidamente a acciones como imprimir el CV o visitar perfiles sociales con el atajo de teclado (`⌘K` o `Ctrl+K`).
- **🖨️ Exportación a PDF Amigable con ATS**: Genera una versión en PDF limpia y de una sola columna, optimizada para los Sistemas de Seguimiento de Candidatos (ATS) que utilizan los reclutadores.
- **🎬 Animaciones Sutiles**: Las secciones aparecen con animaciones suaves a medida que te desplazas, gracias a `IntersectionObserver`.
- **🐍 Preloader Interactivo**: Una divertida animación de "juego de la serpiente" como preloader mientras carga el contenido.
- **📱 Completamente Responsivo**: El diseño se adapta perfectamente a cualquier tamaño de pantalla, desde móviles hasta escritorios.

## 🛠️ Stack Tecnológico

- **Framework**: [Next.js](https://nextjs.org/) (con App Router)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **UI**: [ShadCN UI](https://ui.shadcn.com/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Iconos**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- **Hosting**: [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)

## 🚀 Cómo Empezar

Sigue estos pasos para tener una copia del proyecto funcionando en tu máquina local.

### Prerrequisitos

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

### Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Ejecuta el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

Abre [http://localhost:9002](http://localhost:9002) en tu navegador para ver la aplicación en acción.

## ✏️ Personalización del Contenido

Toda la información personal y profesional del CV se gestiona a través de archivos JSON. Esto hace que sea muy fácil actualizar tu información sin tocar el código de la aplicación.

- **Ubicación de los Datos**: Los archivos de datos se encuentran en la carpeta `src/data/`.
- **Estructura**: Hay un archivo `.json` para cada idioma (`es.json`, `en.json`, etc.).
- **Modificación**: Simplemente abre el archivo del idioma que deseas editar y cambia el contenido. Puedes añadir o eliminar secciones como `work`, `projects` o `skills` siguiendo la estructura existente.
- **Iconos de Habilidades**: Para los íconos de la sección de habilidades, asegúrate de que el nombre del ícono en el campo `icon` corresponda a un archivo SVG existente en la carpeta `public/icons/`.

## ☁️ Despliegue en Firebase

Este proyecto está preconfigurado para desplegarse fácilmente con Firebase App Hosting.

1.  **Crea un proyecto en Firebase**: Ve a la [Consola de Firebase](https://console.firebase.google.com/) y crea un nuevo proyecto.
2.  **Activa App Hosting**: En el menú de tu proyecto, ve a la sección "Build" > "App Hosting".
3.  **Conecta tu Repositorio de GitHub**: Sigue los pasos para conectar Firebase con tu repositorio de GitHub donde tienes alojado este proyecto.
4.  **Despliega**: Una vez conectado, Firebase construirá y desplegará tu aplicación automáticamente cada vez que hagas un `push` a la rama principal (`main`).

¡Y listo! Tu CV interactivo estará en línea y disponible para todo el mundo.
