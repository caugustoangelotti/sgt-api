import { ProfessorPostgresRepository } from '../../../infra/db'
import { DbRemoveProfessor } from '../../../data/usecases'
import type { RemoveProfessor } from '../../../domain/usecases'

export const makeDbRemoveProfessor = (): RemoveProfessor => {
  const professorPostgresRepository = new ProfessorPostgresRepository()
  return new DbRemoveProfessor(professorPostgresRepository)
}
