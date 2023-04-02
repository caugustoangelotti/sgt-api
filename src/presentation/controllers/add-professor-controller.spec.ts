import { serverError, ok } from '../helpers/http-helper'
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

  test('Should call AddProfessor with correct values', async () => {
    const { sut, addProfessorSpy } = makeSut()
    const request = {
      body: {
        name: 'any_name',
        email: 'any_email',
        tempoIc: 12
      }
    }
    const professor = {
      name: request.body.name,
      email: request.body.email,
      tempoIc: request.body.tempoIc
    }
    await sut.handle(request)
    expect(addProfessorSpy.params).toEqual(professor)
  })

  test('Should return 500 if AddProfessor throws', async () => {
    const { sut, addProfessorSpy } = makeSut()
    const request = {
      body: {
        name: 'any_name',
        email: 'any_email',
        tempoIc: 12
      }
    }
    jest.spyOn(addProfessorSpy, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const request = {
      body: {
        name: 'any_name',
        email: 'any_email',
        tempoIc: 12
      }
    }
    const response = {
      ...request,
      statusCode: 200
    }
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok(response))
  })
})
