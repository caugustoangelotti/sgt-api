import { CheckProfessorByIdSpy, RemoveProfessorSpy, ValidationSpy } from '../mocks'
import { RemoveProfessorController } from './remove-professor-controller'

import MockDate from 'mockdate'
import { randNumber } from '@ngneat/falso'
import { badRequest, noContent, serverError } from '../helpers'
import { InvalidParamError } from '../errors'

interface SutTypes {
  sut: RemoveProfessorController
  removeProfessorSpy: RemoveProfessorSpy
  validationSpy: ValidationSpy
  checkProfessorByIdSpy: CheckProfessorByIdSpy
}

const makeSut = (): SutTypes => {
  const removeProfessorSpy = new RemoveProfessorSpy()
  const validationSpy = new ValidationSpy()
  const checkProfessorByIdSpy = new CheckProfessorByIdSpy()
  const sut = new RemoveProfessorController(removeProfessorSpy, checkProfessorByIdSpy, validationSpy)
  return {
    sut,
    removeProfessorSpy,
    validationSpy,
    checkProfessorByIdSpy
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
    const { sut, checkProfessorByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(checkProfessorByIdSpy.id).toBe(request.id)
  })

  test('Should call RemoveProfessor with correct values', async () => {
    const { sut, removeProfessorSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    const { id } = request
    expect(removeProfessorSpy.params).toEqual(id)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should return 400 if CheckProfessorById returns false', async () => {
    const { sut, checkProfessorByIdSpy } = makeSut()
    checkProfessorByIdSpy.result = false
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
    const { sut, checkProfessorByIdSpy } = makeSut()
    const request = mockRequest()
    jest.spyOn(checkProfessorByIdSpy, 'checkById').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 500 if UpdateProfessor throws', async () => {
    const { sut, removeProfessorSpy } = makeSut()
    const request = mockRequest()
    jest.spyOn(removeProfessorSpy, 'remove').mockImplementationOnce(() => {
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
