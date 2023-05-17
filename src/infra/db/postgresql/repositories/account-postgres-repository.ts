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
    const professorRepository = PostgresHelper.client.manager.getRepository('professores')
    const accountRepository = PostgresHelper.client.manager.getRepository('accounts')
    const professor = await professorRepository.findOneBy({
      email
    })
    if (professor) {
      const account = await accountRepository.findOneBy({
        professor: professor.id
      })
      const { id, name } = professor
      const accountData = {
        id,
        name,
        password: account?.password
      }
      return accountData
    }
    return null as any
  }

  async checkByEmail (email: string): Promise<CheckAccountByEmailRepository.Result> {
    const accountsRepository = PostgresHelper.client.manager.getRepository('accounts')
    const account = await accountsRepository.findOneBy({
      professor: {
        email
      }
    })
    return account !== null
  }

  async updateAccessToken (id: number, token: string): Promise<void> {
    const accountsRepository = PostgresHelper.client.manager.getRepository('accounts')
    await accountsRepository.update(id, { accessToken: token })
  }

  async loadByToken (token: string, role?: string): Promise<LoadAccountByTokenRepository.Result> {
    const accountsRepository = PostgresHelper.client.manager.getRepository('accounts')
    const account = await accountsRepository.findOne({
      where: [
        {
          accessToken: token,
          role
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
