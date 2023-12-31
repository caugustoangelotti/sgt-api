import type { AddAccount, Authentication, LoadAccountByToken } from '../../domain/usecases'

import { randUuid, randFullName, randNumber } from '@ngneat/falso'

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params
  result = true

  async add (params: AddAccount.Params): Promise<AddAccount.Result> {
    this.params = params
    return this.result
  }
}

export class AuthenticationSpy implements Authentication {
  params: Authentication.Params
  result = {
    accessToken: randUuid(),
    name: randFullName()
  }

  async auth (params: Authentication.Params): Promise<Authentication.Result> {
    this.params = params
    return this.result
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  accessToken: string
  role: string
  result = {
    id: randNumber({ min: 1, max: 99999999 })
  }

  async load (accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
    this.accessToken = accessToken
    this.role = role as unknown as string
    return this.result
  }
}
