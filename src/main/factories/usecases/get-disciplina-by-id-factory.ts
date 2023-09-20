import { DbGetDisciplinaById } from '../../../data/usecases'
import type { GetDisciplinaById } from '../../../domain/usecases'
import { DisciplinaPostgresRepository } from '../../../infra/db'

export const makeDbGetDisciplinaById = (): GetDisciplinaById => {
  const disciplinaPostgresRepository = new DisciplinaPostgresRepository()
  return new DbGetDisciplinaById(disciplinaPostgresRepository)
}
