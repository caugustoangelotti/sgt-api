import type { Validation } from '../../presentation/protocols'
import { InvalidNumericIdError } from '../../presentation/errors'

export class NumericIdValidation implements Validation {
  constructor (
    private readonly fieldName: string
  ) {}

  validate (input: any): Error | any {
    if (input[this.fieldName] === undefined) return
    const fieldData = input[this.fieldName]
    if (!(typeof fieldData === 'number') || !(Number.isInteger(fieldData)) || fieldData < 0) {
      return new InvalidNumericIdError(this.fieldName)
    }
  }
}
