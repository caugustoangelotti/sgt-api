import type { Validation } from '../../presentation/protocols'
import { InvalidLengthError } from '../../presentation/errors'

export class FieldLengthValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly min: number,
    private readonly max: number
  ) {}

  validate (input: any): Error | any {
    if (input[this.fieldName] === undefined) return
    const fieldData = input[this.fieldName]
    if (fieldData.length < this.min || fieldData.length > this.max) {
      return new InvalidLengthError(this.fieldName, this.min, this.max)
    }
  }
}
