import { CheckDisciplinaByIdSpy, RemoveDisciplinaSpy, ValidationSpy } from '../mocks'
import { badRequest, noContent, serverError } from '../helpers'
import { InvalidParamError } from '../errors'
import { RemoveDisciplinaController } from './remove-disciplina-controller'

import { randNumber } from '@ngneat/falso'
import MockDate from 'mockdate'

interface SutTypes {
  sut: RemoveDisciplinaController
  removeDisciplinaSpy: RemoveDisciplinaSpy
  validationSpy: ValidationSpy
  checkDisciplinaByIdSpy: CheckDisciplinaByIdSpy
}

const makeSut = (): SutTypes => {
  const removeDisciplinaSpy = new RemoveDisciplinaSpy()
  const validationSpy = new ValidationSpy()
  const checkDisciplinaByIdSpy = new CheckDisciplinaByIdSpy()
  const sut = new RemoveDisciplinaController(removeDisciplinaSpy, checkDisciplinaByIdSpy, validationSpy)
  return {
    sut,
    removeDisciplinaSpy,
    validationSpy,
    checkDisciplinaByIdSpy
  }
}

const mockRequest = (): any => ({
  id: randNumber({ min: 10000000, max: 99999999 })
})

describe('Remove Professor Controller', () => {
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

  test('Should call CheckProfessorById with correct value', async () => {
    const { sut, checkDisciplinaByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(checkDisciplinaByIdSpy.id).toBe(request.id)
  })

  test('Should call RemoveProfessor with correct values', async () => {
    const { sut, removeDisciplinaSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    const { id } = request
    expect(removeDisciplinaSpy.params).toEqual(id)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should return 400 if CheckProfessorById returns false', async () => {
    const { sut, checkDisciplinaByIdSpy } = makeSut()
    checkDisciplinaByIdSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('id')))
  })

  test('Should return 500 if Validation throws', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 500 if CheckProfessorById throws', async () => {
    const { sut, checkDisciplinaByIdSpy } = makeSut()
    const request = mockRequest()
    jest.spyOn(checkDisciplinaByIdSpy, 'checkById').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 500 if UpdateProfessor throws', async () => {
    const { sut, removeDisciplinaSpy } = makeSut()
    const request = mockRequest()
    jest.spyOn(removeDisciplinaSpy, 'remove').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    const { id } = request
    const httpResponse = await sut.handle(id)
    expect(httpResponse).toEqual(noContent())
  })
})
