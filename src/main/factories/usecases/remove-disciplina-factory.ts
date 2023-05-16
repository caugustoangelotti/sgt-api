import { DisciplinaPostgresRepository } from '../../../infra/db'
import { DbRemoveDisciplina } from '../../../data/usecases'
import type { RemoveDisciplina } from '../../../domain/usecases'

export const makeDbRemoveDisciplina = (): RemoveDisciplina => {
  const disciplinaPostgresRepository = new DisciplinaPostgresRepository()
  return new DbRemoveDisciplina(disciplinaPostgresRepository)
}
