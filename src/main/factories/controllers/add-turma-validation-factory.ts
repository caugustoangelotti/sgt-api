import { ValidationComposite, RequiredFieldValidation, FieldLengthValidation } from '../../../validation/validators'
import type { Validation } from '../../../presentation/protocols'

export const makeAddTurmaValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['disciplina', 'horarios', 'modelo']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new FieldLengthValidation('disciplina', 24, 24))
  validations.push(new FieldLengthValidation('modelo', 2, 6))
  return new ValidationComposite(validations)
}
