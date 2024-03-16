import { z, defineCollection } from "astro:content";

const episodeCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        audioUrl: z.string(),
        pubDate: z.coerce.date().optional(),
        cover: z.string().optional(),
        explicit: z.boolean().optional(),
        episode: z.number().optional(),
        season: z.number().optional(),
        episodeType: z.string().optional(),
        duration: z.coerce.string(), //duration in format hh:mm:ss
        size: z.number(), // size in megabytes
    })
});


const blogCollection = defineCollection({
    type: 'content', // v2.5.0 and later
    schema: z.object({
        title: z.string(),
        description: z.string(),
        publishDate: z.coerce.date(),
    }),
});

export const collections = {
    'episode': episodeCollection,
    'blog': blogCollection,
}