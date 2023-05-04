import type { LoadTurma } from '../../../domain/usecases'
import { TurmaMongoRepository } from '../../../infra/db/mongodb'
import { DbLoadTurma } from '../../../data/usecases'

export const makeDbLoadTurma = (): LoadTurma => {
  const turmaMongoRepository = new TurmaMongoRepository()
  return new DbLoadTurma(turmaMongoRepository)
}
