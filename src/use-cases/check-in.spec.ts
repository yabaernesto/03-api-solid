import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in use case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(8.7668108),
      longitude: new Decimal(13.3955795),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('shoud be able to check-in.', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: 8.8918114,
      userLongitude: 13.347178,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('shoud not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: 8.8918114,
      userLongitude: 13.347178,
    })

    await expect(() =>
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: 8.8918114,
        userLongitude: 13.347178,
      })
    ).rejects.toBeInstanceOf(Error)
  })

  it('shoud not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: 8.8918114,
      userLongitude: 13.347178,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: 8.8918114,
      userLongitude: 13.347178,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('shoud not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(8.7668108),
      longitude: new Decimal(13.3955795),
    })

    await expect(() =>
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-02',
        userLatitude: 8.8918114,
        userLongitude: 13.347178,
      })
    ).rejects.toBeInstanceOf(Error)
  })
})
