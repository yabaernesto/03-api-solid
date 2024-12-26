// biome-ignore lint/style/useImportType: <explanation>
import { Gym } from '@prisma/client'

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
}
