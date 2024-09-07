"use server"

import { redirect } from "next/navigation"

import { prisma } from "../prismaClient"

export const createPost = async (props: { title: string }) => {
  await prisma.post.create({
    data: {
      title: props.title,
    },
  })

  redirect("/posts")
}
