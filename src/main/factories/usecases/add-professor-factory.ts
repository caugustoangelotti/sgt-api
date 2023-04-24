import type { AddProfessor } from '../../../domain/usecases'
import { ProfessorMongoRepository } from '../../../infra/db/mongodb'
import { DbAddProfessor } from '../../../data/usecases'

export const makeDbAddProfessor = (): AddProfessor => {
  const profesorMongoRepository = new ProfessorMongoRepository()
  return new DbAddProfessor(profesorMongoRepository)
}
