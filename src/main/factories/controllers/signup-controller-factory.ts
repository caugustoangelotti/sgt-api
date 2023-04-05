import { makeDbAuthentication, makeSignUpValidation, makeLogControllerDecorator, makeDbAddAccount } from '../../../main/factories'
import { SignUpController } from '../../../presentation/controllers'
import type { Controller } from '../../../presentation/protocols'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
