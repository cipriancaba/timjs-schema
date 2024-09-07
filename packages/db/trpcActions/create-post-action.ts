"use server"

import { redirect } from "next/navigation"
import { z } from "zod"

import { prisma } from "../prismaClient"
import { unauthenticatedAction } from "./trpc"

export const createPost = unauthenticatedAction
  .meta({ span: "create-post-action" })
  .input(
    z.object({
      title: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    await prisma.user.findFirst({
      where: {
        id: 1,
      },
      include: {
        posts: true,
      },
    })
    redirect("/posts")
  })
