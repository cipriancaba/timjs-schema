"use client"

import { createPost } from "@acme/db/actions/create-post-action"

const CreatePost = () => {
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={async () => {
          await createPost({
            title: "Hello again from tim js",
          })
        }}
      >
        Create post
      </button>
    </div>
  )
}

export default CreatePost
