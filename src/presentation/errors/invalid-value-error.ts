export class InvalidValueError extends Error {
  constructor (paramName: string, min: number, max: number) {
    super(`The parameter: ${paramName}, must be a numeric integer between ${min} and ${max}.`)
    this.name = 'InvalidValueError'
  }
}
