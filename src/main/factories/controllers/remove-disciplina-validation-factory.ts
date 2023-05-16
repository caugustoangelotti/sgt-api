import { ValidationComposite, RequiredFieldValidation, NumericIdValidation } from '../../../validation/validators'
import type { Validation } from '../../../presentation/protocols'

export const makeRemoveDisciplinaValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new RequiredFieldValidation('id'))
  validations.push(new NumericIdValidation('id'))
  return new ValidationComposite(validations)
}
