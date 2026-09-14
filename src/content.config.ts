import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { file } from "astro/loaders";

/**
 * US1, US2 & US6: Información institucional, Hero, Quiénes Somos, Filosofía y Canales de Contacto
 */
const company = defineCollection({
  loader: file("src/content/company.json"),
  schema: z.object({
    id: z.string(),
    hero: z.object({
      headline: z.string(),
      subheadline: z.string(),
      cta: z.object({
        label: z.string(),
        href: z.string(),
      }),
    }),
    about: z.object({
      mission: z.string(),
      vision: z.string(),
      customPhilosophy: z.string(),
    }),
    contact: z.object({
      email: z.string().email(),
      whatsapp: z.object({
        number: z.string(),
        display: z.string(),
        defaultMessage: z.string(),
      }),
      responseTime: z.string(),
    }),
    navLinks: z.array(
      z.object({
        label: z.string(),
        href: z.string(),
      })
    ),
  }),
});

/**
 * US4: Catálogo de Servicios
 */
const services = defineCollection({
  loader: file("src/content/services.json"),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    ctaLabel: z.string().default("Cotizar este servicio"),
    serviceKey: z.string(),
    order: z.number().default(1),
  }),
});

/**
 * US3: Integrantes del Equipo Técnico
 */
const team = defineCollection({
  loader: file("src/content/team.json"),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    avatar: z.string(),
    order: z.number().default(1),
  }),
});

/**
 * US5: Portafolio de Proyectos y Demostraciones
 */
const portfolio = defineCollection({
  loader: file("src/content/portfolio.json"),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    client: z.string(),
    problemSolved: z.string(),
    image: z.string(),
    imageAlt: z.string().default(""),
    tags: z.array(z.string()),
    demoUrl: z.string().url().optional(),
    order: z.number().default(1),
  }),
});

export const collections = {
  company,
  services,
  team,
  portfolio,
};
