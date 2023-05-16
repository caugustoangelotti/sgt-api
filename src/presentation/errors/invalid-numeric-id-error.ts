export class InvalidNumericIdError extends Error {
  constructor (paramName: string) {
    super(`The parameter: ${paramName}, must be a positive integer.`)
    this.name = 'InvalidNumericIdError'
  }
}
