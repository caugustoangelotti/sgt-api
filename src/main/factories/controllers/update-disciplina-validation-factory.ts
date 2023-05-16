import { ValidationComposite, RequiredFieldValidation, FieldLengthValidation, FieldValueValidation, NumericIdValidation } from '../../../validation/validators'
import type { Validation } from '../../../presentation/protocols'

export const makeUpdateDisciplinaValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new RequiredFieldValidation('id'))
  validations.push(new NumericIdValidation('id'))
  validations.push(new FieldValueValidation('semestre', 1, 8))
  validations.push(new FieldLengthValidation('codigo', 4, 24))
  validations.push(new FieldLengthValidation('cargaHoraria', 1, 999))
  return new ValidationComposite(validations)
}
