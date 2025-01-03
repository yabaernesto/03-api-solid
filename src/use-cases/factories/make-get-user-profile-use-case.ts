import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetUserProfileteUseCase() {
  const userRepository = new PrismaUsersRepository()
  const useCase = new GetUserProfileUseCase(userRepository)

  return useCase
}
