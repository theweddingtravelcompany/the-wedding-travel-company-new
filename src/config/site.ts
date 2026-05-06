export const SITE = {
  name: 'The Wedding Travel Company',
  title: 'Official Website | The Wedding Travel Company',
  description: 'Award-winning destination wedding specialists trusted by thousands of couples each year. Design your dream wedding abroad.',
  url: 'https://twtc-site.pagesmith.app/',
  twitterHandle: '@twtc',
  socials: {
    twitter: 'https://twitter.com/twtc',
    instagram: 'https://instagram.com/twtc',
    linkedin: 'https://www.linkedin.com/company/twtc',
    facebook: 'https://facebook.com/twtc',
  },
} as const;

export type SiteConfig = typeof SITE;
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    // Required fields
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),

    // Optional basic fields
    author: z.string().optional(),
    image: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),

    // Date fields
    updatedDate: z.coerce.date().optional(),

    // SEO fields
    ogImage: z.string().optional(),
    canonicalUrl: z.string().optional(),

    // Organization fields
    featured: z.boolean().default(false),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),

    // Display fields
    toc: z.boolean().default(true),
    readingTime: z.string().optional(),
  }),
});

const docs = defineCollection({
  type: 'content',
  schema: z.object({
    // Required fields
    title: z.string(),
    description: z.string(),

    // Docs-specific fields
    order: z.number().optional(),
    section: z.string().optional(),

    // Optional basic fields (shared with blog)
    pubDate: z.coerce.date().optional(),
    author: z.string().optional(),
    image: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),

    // Date fields
    updatedDate: z.coerce.date().optional(),

    // SEO fields
    ogImage: z.string().optional(),
    canonicalUrl: z.string().optional(),

    // Organization fields
    featured: z.boolean().default(false),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),

    // Display fields
    toc: z.boolean().default(true),
    readingTime: z.string().optional(),
  }),
});

export const collections = { blog, docs };
