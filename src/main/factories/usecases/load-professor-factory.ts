import type { LoadProfessor } from '../../../domain/usecases'
import { DbLoadProfessor } from '../../../data/usecases'
import { ProfessorPostgresRepository } from '../../../infra/db'

export const makeDbLoadProfessor = (): LoadProfessor => {
  const professorPostgresRepository = new ProfessorPostgresRepository()
  return new DbLoadProfessor(professorPostgresRepository)
}
