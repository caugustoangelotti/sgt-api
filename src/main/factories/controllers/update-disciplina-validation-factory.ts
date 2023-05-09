import { ValidationComposite, RequiredFieldValidation, FieldLengthValidation, FieldValueValidation } from '../../../validation/validators'
import type { Validation } from '../../../presentation/protocols'

export const makeUpdateDisciplinaValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new RequiredFieldValidation('id'))
  validations.push(new FieldLengthValidation('id', 24, 24))
  validations.push(new FieldValueValidation('semestre', 1, 8))
  validations.push(new FieldValueValidation('codigo', 1, 999))
  return new ValidationComposite(validations)
}
