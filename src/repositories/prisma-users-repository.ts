import { prisma } from '@/lib/prisma'
// biome-ignore lint/style/useImportType: <explanation>
import { Prisma } from '@prisma/client'

export class PrismaUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
