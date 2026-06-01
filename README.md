# WaaS Console & OpenBio Manager

Panel de administración B2B (Workspace as a Service) y motor de renderizado público para **OpenBio**, un sistema de gestión de enlaces (Link-in-Bio) de alto rendimiento.

Esta aplicación frontend forma parte de una arquitectura Serverless operando en el Edge, diseñada bajo principios de seguridad Zero-Trust y separación estricta de entornos.

---

## 🚀 Arquitectura y Características

- **Gestor de Enlaces B2B:** CRUD completo protegido por tokens JWT efímeros.
- **Vista Pública Mobile-First:** Interfaz renderizada estáticamente que actúa como punto de entrada público (`/bio`), conectada a un proxy de redirección en el backend.
- **Motor de Analíticas en Tiempo Real:** Telemetría inyectada asíncronamente desde el Edge (`executionCtx.waitUntil`) y visualizada mediante barras de progreso dinámicas en el panel de control.
- **Diseño UI/UX:** Interfaz en modo oscuro profundo (Dark Mode) utilizando TailwindCSS para una experiencia administrativa profesional.

---

## 🛠️ Stack Tecnológico

- **Core:** React 19 + TypeScript + Vite
- **Estilos:** TailwindCSS
- **Iconografía Dinámica:** Lucide React (Mapeo vectorial en tiempo de ejecución)
- **Enrutamiento:** React Router DOM (Protección de rutas perimetral)
- **Gestión de Estado B2B:** Zustand (Almacenamiento persistente del estado de autenticación)

> [!NOTE]
> El backend de este sistema está construido sobre Cloudflare Workers, Hono, Drizzle ORM y D1 SQLite, asegurando latencia cero y despliegue global.

---

## ⚙️ Configuración y Despliegue Local

### 1. Clona el repositorio
```bash
git clone https://github.com/tu-usuario/dashboard-waas.git
cd dashboard-waas
```

### 2. Instala las dependencias
```bash
npm install
```

### 3. Configura las variables de entorno
Crea un archivo `.env` o `.env.local` en la raíz y añade la URL de tu API Gateway (Backend):
```env
VITE_API_URL=https://api-gateway.<tu-subdominio>.workers.dev/api/v1
```

### 4. Levanta el servidor de desarrollo
```bash
npm run dev
```

---

## 🌍 Despliegue a Producción

Este proyecto está optimizado para ser desplegado en plataformas Edge/Serverless como **Vercel** o **Cloudflare Pages**.

> [!IMPORTANT]
> Asegúrate de inyectar la variable de entorno `VITE_API_URL` apuntando al dominio de tu Worker en producción antes de ejecutar el proceso de build.

Para compilar el proyecto:
```bash
npm run build
```

---

Desarrollado y estructurado con dedicación por **Azael Reyes Martel**.
