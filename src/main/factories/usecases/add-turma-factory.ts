import type { AddTurma } from '../../../domain/usecases'
import { DbAddTurma } from '../../../data/usecases'
import { TurmaPostgresRepository } from '../../../infra/db'

export const makeDbAddTurma = (): AddTurma => {
  const turmaPostgresRepository = new TurmaPostgresRepository()
  return new DbAddTurma(turmaPostgresRepository)
}
