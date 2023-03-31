import { MissingParamError } from '../errors'
import { AddProfessorController } from './add-professor-controller'

describe('Add Professor Controller', () => {
  test('Should return 400 if no name is provided', async () => {
    const httpRequest = {
      body: {
        email: 'any_email',
        tempoIc: 12
      }
    }
    const sut = new AddProfessorController()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should return 400 if no email is provided', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        tempoIc: 12
      }
    }
    const sut = new AddProfessorController()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no tempoIc is provided', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email'
      }
    }
    const sut = new AddProfessorController()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('tempoIc'))
  })
})
