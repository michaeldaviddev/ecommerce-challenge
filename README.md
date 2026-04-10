# Ecommerce Challenge

Desafío técnico desarrollado con Angular 21 y soporte SSR.

## Requisitos

- Node.js 18+ (recomendado)
- NPM 11+ (el proyecto define `npm@11.9.0` como package manager)
- Angular CLI no es obligatorio globalmente, pero puedes usar `npm run` para ejecutar los comandos disponibles.

## Instalación

Desde la raíz del proyecto:

```bash
npm install
```

Esto instalará todas las dependencias definidas en `package.json`.

## Ejecución del proyecto

### Servidor de desarrollo

```bash
npm start
```

Abre `http://localhost:4200/` en tu navegador. El servidor recarga automáticamente los cambios.

### Compilación para producción

```bash
npm run build
```

Genera los archivos optimizados en la carpeta `dist/`.

### Ejecutar SSR localmente

Después de construir el proyecto, puedes iniciar el servidor SSR con:

```bash
npm run serve:ssr:ecommerce-challenge
```

El servidor escucha por defecto en `http://localhost:4000/`.

### Ejecutar pruebas unitarias

```bash
npm test
```

## Estructura de la solución

La aplicación está organizada en una estructura clara y escalable:

- `src/app/`
  - `components/` - componentes reutilizables como `header`, `footer` y `product-card`
  - `pages/` - páginas principales: `product-list`, `product-detail`, `cart`
  - `services/` - lógica de negocio y acceso a datos: `product.service.ts`, `cart.service.ts`
  - `models/` - definiciones de tipos y datos compartidos, por ejemplo `product.ts`
- `src/app/app.routes.ts` - rutas principales con carga diferida (`lazy loading`) de páginas
- `src/server.ts` - servidor Express para renderizado del lado del servidor (SSR)
- `public/mock/products.json` - datos de productos usados por `ProductService`

## Optimizaciones de performance

Esta solución incorpora varias mejoras para rendimiento:

- `ng build` usa la configuración de producción de Angular para habilitar:
  - minificación
  - tree shaking
  - hashing de archivos
- Rutas cargadas de forma perezosa con `loadComponent(...)` en `src/app/app.routes.ts`, lo que reduce el tamaño inicial del bundle.
- SSR con `@angular/ssr` y `Express` para mejorar el FCP y SEO.
- Uso de componentes standalone y reactividad nativa de Angular para mantener la UI eficiente.
- Uso de NgOptimizedImage
- Separación de responsabilidades entre servicios y componentes para evitar lógica duplicada y mejorar la mantenibilidad.

## Cómo se estructuró la solución para escalar

La arquitectura se diseñó pensando en crecimiento y extensibilidad:

- Componentes y páginas independientes: cada página es un componente autocontenido que puede agregarse o modificarse sin afectar el resto.
- Servicios `ProductService` y `CartService` encargan la gestión de datos y el estado local, lo que facilita cambiar la fuente de datos o agregar persistencia adicional.
- Rutas declarativas con carga diferida permiten agregar nuevas secciones sin penalizar el tiempo de carga inicial.
- La carpeta `public/mock` puede reemplazarse fácilmente por una API real manteniendo la misma interfaz de datos.

## Notas adicionales

- El servicio `ProductService` consume `mock/products.json` para simular una API de productos.
- `CartService` guarda el carrito en `localStorage`, lo que permite persistencia básica entre recargas.
- El proyecto usa `Vitest` para pruebas unitarias mediante el comando `npm test`.

## Preguntas técnicas

### 1. ¿Qué decisiones tomaste para mejorar la performance en esta página?
- Implementé SSR para entregar HTML pre-renderizado desde el servidor. Esto reduce significativamente el Time to First Paint (FCP) y mejora el SEO, ya que el contenido es visible antes de que Angular se hidrate en el cliente.
- Dividí la aplicación en componentes cargados de forma diferida usando `loadComponent(...)` lo que permitió reducir el tamaño del bundle inicial.
- Utilicé `NgOptimizedImage` para aplicar lazy loading automático, esto ayuda a mejorar métricas como el Largest Contentful Paint (LCP).

### 2. ¿Cómo estructurarías esta solución para soportar múltiples marcas con diferentes estilos?
- Usaría un sistema de temas CSS/SCSS basado en variables.
- Usaría un servicio con los datos de marca.
- Mantendría componentes visuales reutilizables y parametrizables para que sólo el estilo cambie, no la lógica.

### 3. Si esta página presenta problemas de LCP en producción, ¿cómo lo abordaría?
- Identificaría las causas usando Lighthouse o Web Vitals.
- Optimizaría las imágenes y recursos grandes, preferiblemente con `NgOptimizedImage` o carga diferida (`loading="lazy"`).
- Revisaría las etiquetas link.
- Revisaría el tiempo de respuesta del servidor.

### 4. ¿Cómo evitarías que eventos de Analytics se disparen múltiples veces en una SPA?
- Centralizaría la lógica de analytics en un servicio.
- Evitaría eventos frecuentes como click repetitivos

### 5. ¿Qué consideraciones SEO tendrías en cuenta para esta página en un entorno real?
- Mantener SSR activo para entregar HTML indexable y mejorar la visibilidad en buscadores.
- Usar rutas limpias y semánticas, por ejemplo `/products`, `/product/:id`, `/cart`.
- Añadir metadatos dinámicos y etiquetas `title`/`description` relevantes por página.
- Configurar un sitemap y `robots.txt` apropiados en el despliegue final.
