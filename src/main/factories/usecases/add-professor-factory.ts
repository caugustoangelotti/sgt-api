import type { AddProfessor } from '../../../domain/usecases'
import { DbAddProfessor } from '../../../data/usecases'
import { ProfessorPostgresRepository } from '../../../infra/db'

export const makeDbAddProfessor = (): AddProfessor => {
  //  const profesorMongoRepository = new ProfessorMongoRepository()
  const profesorPostgresRepository = new ProfessorPostgresRepository()
  return new DbAddProfessor(profesorPostgresRepository)
}
