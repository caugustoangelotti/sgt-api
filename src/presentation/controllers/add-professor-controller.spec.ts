import type { AddProfessor } from '../../domain/usecases/add-professor'
import { MissingParamError } from '../errors'
import { AddProfessorController } from './add-professor-controller'

class AddProfessorSpy implements AddProfessor {
  params: AddProfessor.Params

  async add (params: AddProfessor.Params): Promise<void> {
    this.params = params
  }
}

interface SutTypes {
  sut: AddProfessorController
  addProfessorSpy: AddProfessorSpy
}

const makeSut = (): SutTypes => {
  const addProfessorSpy = new AddProfessorSpy()
  const sut = new AddProfessorController(addProfessorSpy)
  return {
    sut,
    addProfessorSpy
  }
}

describe('Add Professor Controller', () => {
  test('Should return 400 if no name is provided', async () => {
    const httpRequest = {
      body: {
        email: 'any_email',
        tempoIc: 12
      }
    }
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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
    const { sut } = makeSut()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('tempoIc'))
  })
})
