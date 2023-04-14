import { ValidationComposite, RequiredFieldValidation } from '../../../validation/validators'
import type { Validation } from '../../../presentation/protocols'

export const makeAddDisciplinaValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'semestre', 'codigo']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
