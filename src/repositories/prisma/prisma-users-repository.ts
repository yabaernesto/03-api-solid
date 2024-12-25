import { prisma } from '@/lib/prisma'
// biome-ignore lint/style/useImportType: <explanation>
import { UsersRepository } from '@/repositories/users-repository'
// biome-ignore lint/style/useImportType: <explanation>
import { Prisma, type User } from '@prisma/client'

export class PrismaUsersRepository implements UsersRepository {
  findById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
