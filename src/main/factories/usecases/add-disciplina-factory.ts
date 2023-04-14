import type { AddDisciplina } from '../../../domain/usecases'
import { DisciplinaMongoRepository } from '../../../infra/db/mongodb'
import { DbAddDisciplina } from '../../../data/usecases'

export const makeDbAddDisciplina = (): AddDisciplina => {
  const disciplinaMongoRepository = new DisciplinaMongoRepository()
  return new DbAddDisciplina(disciplinaMongoRepository)
}
