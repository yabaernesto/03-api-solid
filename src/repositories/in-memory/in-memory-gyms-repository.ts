// biome-ignore lint/style/useImportType: <explanation>
import { Gym } from '@prisma/client'
// biome-ignore lint/style/useImportType: <explanation>
import { GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findById(id: string) {
    const gym = this.items.find(item => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }
}