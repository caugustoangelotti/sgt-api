import type { AddProfessor } from '../../../domain/usecases/add-professor'
import { ProfessorMongoRepository } from '../../../infra/db/mongodb/professor-mongo-repository'
import { DbAddProfessor } from '../../../data/usecases/db-add-professor'

export const makeDbAddProfessor = (): AddProfessor => {
  const profesorMongoRepository = new ProfessorMongoRepository()
  return new DbAddProfessor(profesorMongoRepository)
}
