import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetUserProfileRequest {
  userId: string
}

interface GetUserProfileRequestResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileRequest): Promise<GetUserProfileRequestResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
