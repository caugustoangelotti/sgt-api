import { ValidationComposite, RequiredFieldValidation } from '../../../validation/validators'
import type { Validation } from '../../../presentation/protocols'

export const makeAddProfessorValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'tempoIc']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
