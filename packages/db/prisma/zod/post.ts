import * as z from "zod"

import { CompleteUser, RelatedUserSchema } from "./index"

export const PostSchema = z.object({
  id: z.number().int(),
  authorId: z.number().int().nullish(),
  title: z.string(),
  views: z.number().int().nullish(),
  published: z.boolean().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const CreatePostSchema = PostSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  authorId: true,
  views: true,
})

export interface CompletePost extends z.infer<typeof PostSchema> {
  author?: CompleteUser | null
}

/**
 * RelatedPostSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPostSchema: z.ZodSchema<CompletePost> = z.lazy(() =>
  PostSchema.extend({
    author: RelatedUserSchema.nullish(),
  }),
)
