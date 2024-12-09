import { hash } from 'bcryptjs'
// biome-ignore lint/style/useImportType: <explanation>
import { UsersRepository } from '../repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
// biome-ignore lint/style/useImportType: <explanation>
import { User } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersReporitory: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWhiteSomeEmail = await this.usersReporitory.findByEmail(email)

    if (userWhiteSomeEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersReporitory.create({
      name,
      email,
      password_hash,
    })

    return {
      user,
    }
  }
}
