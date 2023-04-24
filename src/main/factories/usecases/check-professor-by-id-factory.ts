import { DbCheckProfessorById } from '../../../data/usecases'
import type { CheckProfessorById } from '../../../domain/usecases'
import { ProfessorMongoRepository } from '../../../infra/db'

export const makeDbCheckProfessorById = (): CheckProfessorById => {
  const professorMongoRepository = new ProfessorMongoRepository()
  return new DbCheckProfessorById(professorMongoRepository)
}
