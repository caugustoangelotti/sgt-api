import { ValidationComposite, RequiredFieldValidation, EmailValidation, FieldLengthValidation, FieldValueValidation, CompareFieldsValidation } from '../../../validation/validators'
import type { Validation } from '../../../presentation/protocols'
import { EmailValidatorAdapter } from '../../../infra/validators'

export const makeAddProfessorValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'tempoIc', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new FieldLengthValidation('name', 6, 255))
  validations.push(new FieldLengthValidation('email', 6, 255))
  validations.push(new FieldLengthValidation('password', 6, 72))
  validations.push(new FieldLengthValidation('passwordConfirmation', 6, 72))
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new FieldValueValidation('tempoIc', 1, 999))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
