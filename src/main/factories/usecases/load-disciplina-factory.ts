import type { LoadDisciplina } from '../../../domain/usecases'
import { DisciplinaPostgresRepository } from '../../../infra/db'
import { DbLoadDisciplina } from '../../../data/usecases'

export const makeDbLoadDisciplina = (): LoadDisciplina => {
  const disciplinaPostgresRepository = new DisciplinaPostgresRepository()
  return new DbLoadDisciplina(disciplinaPostgresRepository)
}
