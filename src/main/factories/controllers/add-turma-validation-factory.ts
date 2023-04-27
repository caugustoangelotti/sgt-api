import { ValidationComposite, RequiredFieldValidation, FieldLengthValidation, FieldValueValidation } from '../../../validation/validators'
import type { Validation } from '../../../presentation/protocols'

export const makeAddTurmaValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['disciplina', 'horarios', 'modelo', 'semestre']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new FieldLengthValidation('disciplina', 3, 255))
  validations.push(new FieldLengthValidation('modelo', 2, 6))
  validations.push(new FieldValueValidation('semestre', 1, 999))
  return new ValidationComposite(validations)
}
