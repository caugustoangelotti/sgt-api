import type { LoadProfessor } from '../../../domain/usecases'
import { ProfessorMongoRepository } from '../../../infra/db/mongodb'
import { DbLoadProfessor } from '../../../data/usecases'

export const makeDbLoadProfessor = (): LoadProfessor => {
  const profesorMongoRepository = new ProfessorMongoRepository()
  return new DbLoadProfessor(profesorMongoRepository)
}
