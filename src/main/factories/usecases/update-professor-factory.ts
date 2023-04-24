import { ProfessorMongoRepository } from '../../../infra/db/mongodb'
import { DbUpdateProfessor } from '../../../data/usecases'
import type { UpdateProfessor } from '../../../domain/usecases'

export const makeDbUpdateProfessor = (): UpdateProfessor => {
  const profesorMongoRepository = new ProfessorMongoRepository()
  return new DbUpdateProfessor(profesorMongoRepository)
}
