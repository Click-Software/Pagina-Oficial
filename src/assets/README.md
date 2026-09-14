# Directorio `src/assets/`

Este directorio está reservado para activos locales (imágenes, gráficos vectoriales, fuentes locales) que **Astro procesa y optimiza** automáticamente durante el build.

## Diferencia entre `src/assets/` y `public/`

| Característica | `src/assets/` | `public/` |
| :--- | :--- | :--- |
| **Optimización de imágenes** | Automática vía `<Image />` o `getImage()` de `astro:assets` (conversión a WebP/AVIF, redimensionamiento, prevención de CLS). | Ninguna. Los archivos se copian tal cual a la raíz de salida. |
| **Importación en código** | `import heroImg from '@/assets/hero.png';` | Referencia por ruta absoluta: `/hero.png` |
| **Uso recomendado** | Fotografías, banners de contenido, imágenes de artículos, ilustraciones de alta resolución. | Favicons, `robots.txt`, `llms.txt`, `_headers`, `og-image.png` estático. |

## Ejemplo de Uso en Astro 7

```astro
---
import { Image } from 'astro:assets';
import bannerImg from '@/assets/banner.png';
---

<Image 
  src={bannerImg} 
  alt="Descripción del banner" 
  width={800} 
  height={450} 
  format="webp" 
  loading="lazy" 
  decoding="async" 
/>
```
