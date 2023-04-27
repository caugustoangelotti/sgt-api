import type { Validation } from '../../presentation/protocols'
import { MissingParamError } from '../../presentation/errors'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  validate (input: any): Error | any {
    //  if (input[this.fieldName] === undefined) return
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
