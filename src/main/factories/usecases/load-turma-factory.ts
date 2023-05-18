import type { LoadTurma } from '../../../domain/usecases'
import { DbLoadTurma } from '../../../data/usecases'
import { TurmaPostgresRepository } from '../../../infra/db'

export const makeDbLoadTurma = (): LoadTurma => {
  const turmaPostgresRepository = new TurmaPostgresRepository()
  return new DbLoadTurma(turmaPostgresRepository)
}
