import { ProfessorPostgresRepository } from '../../../infra/db'
import { DbUpdateProfessor } from '../../../data/usecases'
import type { UpdateProfessor } from '../../../domain/usecases'

export const makeDbUpdateProfessor = (): UpdateProfessor => {
  const professorPostgresRepository = new ProfessorPostgresRepository()
  return new DbUpdateProfessor(professorPostgresRepository)
}
