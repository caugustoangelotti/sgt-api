export class InvalidLengthError extends Error {
  constructor (paramName: string, min: number, max: number) {
    super(`The parameter: ${paramName}, must be between ${min} and ${max} characters.`)
    this.name = 'InvalidLengthError'
  }
}
