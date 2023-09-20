import { DbGetProfessorById } from '../../../data/usecases'
import type { GetProfessorById } from '../../../domain/usecases'
import { ProfessorPostgresRepository } from '../../../infra/db'

export const makeDbGetProfessorById = (): GetProfessorById => {
  const professorPostgresRepository = new ProfessorPostgresRepository()
  return new DbGetProfessorById(professorPostgresRepository)
}
