import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('shoud be able to register.', async () => {
    const { user } = await sut.execute({
      name: 'Yaba Ernesto',
      email: 'yabaernesto@gmail.com',
      password: '12345',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('shoud hash user password upon registration.', async () => {
    const { user } = await sut.execute({
      name: 'Yaba Ernesto',
      email: 'yabaernesto@gmail.com',
      password: '12345',
    })

    const isPasswordCorrectlyHashed = await compare('12345', user.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('shoud not be able to register with same email twice', async () => {
    const email = 'yabaernesto@gmail.com'

    await sut.execute({
      name: 'Yaba Ernesto',
      email,
      password: '12345',
    })

    await expect(() =>
      sut.execute({
        name: 'Yaba Ernesto',
        email,
        password: '12345',
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
