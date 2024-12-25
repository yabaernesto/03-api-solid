import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('shoud be able to authenticate.', async () => {
    await usersRepository.create({
      name: 'Yaba Ernesto',
      email: 'yabaernesto@gmail.com',
      password_hash: await hash('12345', 6),
    })

    const { user } = await sut.execute({
      email: 'yabaernesto@gmail.com',
      password: '12345',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('shoud be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'yabaernesto@gmail.com',
        password: '12345',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('shoud be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'Yaba Ernesto',
      email: 'yabaernesto@gmail.com',
      password_hash: await hash('12345', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'yabaernesto@gmail.com',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
