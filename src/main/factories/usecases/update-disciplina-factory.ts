import { DisciplinaPostgresRepository } from '../../../infra/db'
import { DbUpdateDisciplina } from '../../../data/usecases'
import type { UpdateDisciplina } from '../../../domain/usecases'

export const makeDbUpdateDisciplina = (): UpdateDisciplina => {
  const disciplinaPostgresRepository = new DisciplinaPostgresRepository()
  return new DbUpdateDisciplina(disciplinaPostgresRepository)
}
