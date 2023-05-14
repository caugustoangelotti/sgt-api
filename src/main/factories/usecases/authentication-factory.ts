import env from '../../../main/config/env'
import { AccountPostgresRepository } from '../../../infra/db'
import { BcryptAdapter, JwtAdapter } from '../../../infra/cryptography'
import { DbAuthentication } from '../../../data/usecases'
import type { Authentication } from '../../../domain/usecases'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountPostgresRepository = new AccountPostgresRepository()
  return new DbAuthentication(accountPostgresRepository, bcryptAdapter, jwtAdapter, accountPostgresRepository)
}
