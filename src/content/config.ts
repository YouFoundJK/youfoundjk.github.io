import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    abstract: z.string(),
    order: z.number().default(99),
    category: z.array(z.string()),
    date: z.string().optional(),
    featured: z.boolean().default(true),
    thumbnail: z.string(),
    links: z.object({
      pdf: z.string().optional(),
      slides: z.string().optional(),
      code: z.string().optional(),
      external: z.string().optional(),
    }).default({}),
  }),
});

const notesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    category: z.string().default('Research Notes'),
    date: z.string().optional(),
    lastUpdated: z.string().optional(),
    order: z.number().default(99),
  }),
});

const experienceCollection = defineCollection({
  type: 'data',
  schema: z.object({
    role: z.string(),
    institution: z.string(),
    institutionUrl: z.string(),
    location: z.string(),
    period: z.string(),
    logo: z.string(),
    description: z.string(),
    order: z.number().default(99),
  }),
});

const certificationsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    issuer: z.string(),
    issuerUrl: z.string().optional(),
    period: z.string(),
    logo: z.string().optional(),
    description: z.string(),
    certificateUrl: z.string().optional(),
    order: z.number().default(99),
  }),
});

const galleryCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    image: z.string(),
    category: z.string().default('artwork'),
    order: z.number().default(99),
  }),
});

export const collections = {
  projects: projectsCollection,
  notes: notesCollection,
  experience: experienceCollection,
  certifications: certificationsCollection,
  gallery: galleryCollection,
};
