import { initTRPC, TRPCError } from "@trpc/server"
import { experimental_nextAppDirCaller } from "@trpc/server/adapters/next-app-dir"

interface Meta {
  span: string
}

export const t = initTRPC.meta<Meta>().create()

export const serverActionProcedure = t.procedure
  .experimental_caller(
    experimental_nextAppDirCaller({
      pathExtractor: ({ meta }) => (meta as Meta).span,
    }),
  )
  .use(async (opts) => {
    // Inject user into context
    return opts.next({ ctx: { user: { id: 1, name: "Ciprian" } } })
  })

export const unauthenticatedAction = t.procedure.experimental_caller(
  experimental_nextAppDirCaller({
    pathExtractor: ({ meta }) => (meta as Meta).span,
  }),
)

export const authAction = serverActionProcedure.use((opts) => {
  if (!opts.ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    })
  }

  return opts.next({
    ctx: {
      ...opts.ctx,
      user: opts.ctx.user, // <-- ensures type is non-nullable
    },
  })
})
