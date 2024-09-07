import * as z from "zod"
import { CompletePost, RelatedPostSchema } from "./index"

export const UserSchema = z.object({
  id: z.number().int(),
  email: z.string(),
  fullname: z.string().nullish(),
  createdAt: z.date(),
})

export interface CompleteUser extends z.infer<typeof UserSchema> {
  posts: CompletePost[]
}

/**
 * RelatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() => UserSchema.extend({
  posts: RelatedPostSchema.array(),
}))
