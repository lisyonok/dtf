import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient().$extends({
  name: "UpdateAndDeleteIgnoreNotFound",
  model: {
    $allModels: {
      async updateIgnoreOnNotFound<T, A>(
        this: T,
        args: Prisma.Exact<A, Prisma.Args<T, "update">>
      ): Promise<Prisma.Result<T, A, "update"> | null> {
        try {
          const context = Prisma.getExtensionContext(this) as any
          return await context.update(args)
        } catch (err) {
          if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
            return null
          }
          throw err
        }
      },
      async deleteIgnoreOnNotFound<T, A>(
        this: T,
        args: Prisma.Exact<A, Prisma.Args<T, "delete">>
      ): Promise<Prisma.Result<T, A, "delete"> | null> {
        try {
          const context = Prisma.getExtensionContext(this) as any
          return await context.delete(args)
        } catch (err) {
          if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
            return null
          }
          throw err
        }
      }
    }
  }
})

prisma.$connect()

export default prisma
