import { DbAddAccount } from '../../../data/usecases'
import type { AddAccount } from '../../../domain/usecases'
import { BcryptAdapter } from '../../../infra/cryptography'
import { AccountPostgresRepository } from '../../../infra/db'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountPostgresRepository = new AccountPostgresRepository()
  return new DbAddAccount(bcryptAdapter, accountPostgresRepository, accountPostgresRepository)
}
