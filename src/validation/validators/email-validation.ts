import type { EmailValidator } from '../../validation/protocols'
import type { Validation } from '../../presentation/protocols'
import { InvalidParamError } from '../../presentation/errors'

export class EmailValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate (input: any): Error | any {
    if (input[this.fieldName] === undefined) return
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
