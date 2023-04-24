import type { Validation } from '../../presentation/protocols'
import { InvalidValueError } from '../../presentation/errors'

export class FieldValueValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly min: number,
    private readonly max: number
  ) {}

  validate (input: any): Error | any {
    const fieldData = input[this.fieldName]
    if (!(typeof fieldData === 'number') || fieldData < this.min || fieldData > this.max) {
      return new InvalidValueError(this.fieldName, this.min, this.max)
    }
  }
}
