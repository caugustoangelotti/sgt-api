import type { AddDisciplina } from '../../../domain/usecases'
import { DbAddDisciplina } from '../../../data/usecases'
import { DisciplinaPostgresRepository } from '../../../infra/db'

export const makeDbAddDisciplina = (): AddDisciplina => {
  const disciplinaPostgresRepository = new DisciplinaPostgresRepository()
  return new DbAddDisciplina(disciplinaPostgresRepository)
}
