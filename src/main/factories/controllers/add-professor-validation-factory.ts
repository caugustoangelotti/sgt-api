import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '../../../validation/validators'
import type { Validation } from '../../../presentation/protocols'
import { EmailValidatorAdapter } from '../../../infra/validators'

export const makeAddProfessorValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'tempoIc']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
