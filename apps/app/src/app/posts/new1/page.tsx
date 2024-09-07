"use client"

import { CreatePostSchema, PostSchema } from "@acme/db/prisma/zod/post"
import { createPost } from "@acme/db/trpcActions/create-post-action"

import AutoForm, { AutoFormSubmit } from "~/components/ui/auto-form"

const CreatePost = () => {
  return (
    <div className="flex flex-col items-center p-8">
      <AutoForm
        formSchema={CreatePostSchema}
        onSubmit={async (data) => {
          await createPost(data)
        }}
      >
        <AutoFormSubmit>Create post</AutoFormSubmit>
      </AutoForm>
    </div>
  )
}

export default CreatePost
