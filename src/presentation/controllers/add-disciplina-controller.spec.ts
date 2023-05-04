import { badRequest, ok, serverError } from '../helpers'
import { ValidationSpy } from '../mocks'
import { AddDisciplinaSpy } from '../mocks/mock-disciplina'
import { AddDisciplinaController } from './add-disciplina-controller'

import { randUuid, randNumber, randTextRange } from '@ngneat/falso'
import MockDate from 'mockdate'

interface SutTypes {
  sut: AddDisciplinaController
  addDisciplinaSpy: AddDisciplinaSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const addDisciplinaSpy = new AddDisciplinaSpy()
  const validationSpy = new ValidationSpy()
  const sut = new AddDisciplinaController(validationSpy, addDisciplinaSpy)
  return {
    sut,
    addDisciplinaSpy,
    validationSpy
  }
}

const mockRequest = (): AddDisciplinaController.Request => ({
  name: randTextRange({ min: 40, max: 70 }),
  semestre: randNumber({ min: 1, max: 8 }),
  codigo: randUuid()
})

describe('Add Disciplina Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should call AddDisciplina with correct values', async () => {
    const { sut, addDisciplinaSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    const response = {
      ...request,
      dataCadastro: new Date()
    }
    expect(addDisciplinaSpy.params).toEqual(response)
  })

  test('Should return 500 if AddDisciplina throws', async () => {
    const { sut, addDisciplinaSpy } = makeSut()
    const request = mockRequest()
    jest.spyOn(addDisciplinaSpy, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 and disciplina data on success', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    const response = {
      ...request,
      dataCadastro: new Date()
    }
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok(response))
  })
})
