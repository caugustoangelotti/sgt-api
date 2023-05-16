import { ValidationComposite, RequiredFieldValidation, FieldLengthValidation, FieldValueValidation } from '../../../validation/validators'
import type { Validation } from '../../../presentation/protocols'

export const makeAddDisciplinaValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'semestre', 'codigo', 'cargaHoraria']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new FieldLengthValidation('name', 6, 255))
  validations.push(new FieldLengthValidation('email', 6, 255))
  validations.push(new FieldValueValidation('semestre', 1, 8))
  validations.push(new FieldValueValidation('cargaHoraria', 1, 999))
  return new ValidationComposite(validations)
}
