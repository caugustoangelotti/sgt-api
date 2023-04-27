import type { AddTurma } from '../../../domain/usecases'
import { TurmaMongoRepository } from '../../../infra/db/mongodb'
import { DbAddTurma } from '../../../data/usecases'

export const makeDbAddTurma = (): AddTurma => {
  const turmaMongoRepository = new TurmaMongoRepository()
  return new DbAddTurma(turmaMongoRepository)
}
