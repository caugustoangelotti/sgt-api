import type { AddProfessor } from '../../../domain/usecases'
import { DbAddProfessor } from '../../../data/usecases'
import { AccountPostgresRepository, ProfessorPostgresRepository } from '../../../infra/db'
import { BcryptAdapter } from '../../../infra/cryptography'

export const makeDbAddProfessor = (): AddProfessor => {
  const profesorPostgresRepository = new ProfessorPostgresRepository()
  const accountPostgresRepository = new AccountPostgresRepository()
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  return new DbAddProfessor(profesorPostgresRepository, accountPostgresRepository, bcryptAdapter)
}
