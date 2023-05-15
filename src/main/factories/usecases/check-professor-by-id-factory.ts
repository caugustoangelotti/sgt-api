import { DbCheckProfessorById } from '../../../data/usecases'
import type { CheckProfessorById } from '../../../domain/usecases'
import { ProfessorPostgresRepository } from '../../../infra/db'

export const makeDbCheckProfessorById = (): CheckProfessorById => {
  const professorPostgresRepository = new ProfessorPostgresRepository()
  return new DbCheckProfessorById(professorPostgresRepository)
}
