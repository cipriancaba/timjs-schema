import { prisma } from "@acme/db/prismaClient"

const getData = async () => {
  const posts = await prisma.post.findMany()

  return { posts }
}

export default async function POSTS() {
  // You can await this here if you don't want to show Suspense fallback below

  const data = await getData()

  return (
    <main className="container h-screen py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        {data.posts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col gap-2 border border-gray-100 p-2"
          >
            <div className="text-2xl font-bold">{post.title}</div>
          </div>
        ))}
      </div>
    </main>
  )
}
