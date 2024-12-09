import { hash } from 'bcryptjs'
// biome-ignore lint/style/useImportType: <explanation>
import { UsersRepository } from '../repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersReporitory: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWhiteSomeEmail = await this.usersReporitory.findByEmail(email)

    if (userWhiteSomeEmail) {
      throw new UserAlreadyExistsError()
    }

    await this.usersReporitory.create({
      name,
      email,
      password_hash,
    })
  }
}
