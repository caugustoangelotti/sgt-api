import type { AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository, LoadAccountByTokenRepository, UpdateAccessTokenRepository } from '../../../../data/protocols'
import { PostgresHelper } from '../postgres-helper'

export class AccountPostgresRepository implements AddAccountRepository,
                                                  LoadAccountByEmailRepository,
                                                  CheckAccountByEmailRepository,
                                                  UpdateAccessTokenRepository,
                                                  LoadAccountByTokenRepository {
  async add (data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const accountsRepository = PostgresHelper.client.manager.getRepository('accounts')
    const account = accountsRepository.create(data)
    await accountsRepository.save(account)
    return account !== null
  }

  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
    const accountsRepository = PostgresHelper.client.manager.getRepository('accounts')
    const account = await accountsRepository.findOneBy({
      email
    })
    if (account) {
      const { id, name, password } = account
      const accountData = {
        id,
        name,
        password
      }
      return accountData
    }
    return null as any
  }

  async checkByEmail (email: string): Promise<CheckAccountByEmailRepository.Result> {
    const accountsRepository = PostgresHelper.client.manager.getRepository('accounts')
    const account = await accountsRepository.findOneBy({
      email
    })
    return account !== null
  }

  async updateAccessToken (id: number, token: string): Promise<void> {
    const accountsRepository = PostgresHelper.client.manager.getRepository('accounts')
    await accountsRepository.update(id, { accessToken: token })
  }

  async loadByToken (token: string, role?: string): Promise<LoadAccountByTokenRepository.Result> {
    const accountsRepository = PostgresHelper.client.manager.getRepository('accounts')
    const account = await accountsRepository.find({
      where: [
        {
          accessToken: token,
          role: role ?? ''
        },
        {
          accessToken: token,
          role: 'admin'
        }
      ]
    })
    if (account) {
      const { id } = account as any
      return id
    }
    return null as any
  }
}
