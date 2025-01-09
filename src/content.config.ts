import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

//  定义集合
const blogPost = defineCollection({ 
    loader: glob({pattern: "**/*.md", base: "./src/content/blog-post"}),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        tags: z.array(z.string()),
        category: z.string(),
        // cover: z.string().url(),
        draft: z.boolean()
    })
 });

//  注册集合
export const collections = { blogPost };