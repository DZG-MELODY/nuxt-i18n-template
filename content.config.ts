import { defineCollection, defineContentConfig } from "@nuxt/content";
import { z } from "zod";

const pageSchema = z.object({
  title: z.string(),
  content: z.string()
})

export default defineContentConfig({
  collections: {
    about: defineCollection({
      type: 'data',
      source: 'pages/about/*.json',
      schema: pageSchema
    }),
    term: defineCollection({
      type: 'data',
      source: 'pages/term/*.json',
      schema: pageSchema
    }),
    blogs: defineCollection({
      type:'page',
      source: 'blogs/**/*.md',
    })
  }
})