import { serverError, ok } from '../helpers/http-helper'
import { AddProfessorController } from './add-professor-controller'
import { ValidationSpy, AddProfessorSpy } from '../mocks'

import MockDate from 'mockdate'
import { randEmail, randFullName, randNumber } from '@ngneat/falso'

interface SutTypes {
  sut: AddProfessorController
  addProfessorSpy: AddProfessorSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const addProfessorSpy = new AddProfessorSpy()
  const validationSpy = new ValidationSpy()
  const sut = new AddProfessorController(validationSpy, addProfessorSpy)
  return {
    sut,
    addProfessorSpy,
    validationSpy
  }
}

const mockRequest = (): AddProfessorController.Request => ({
  name: randFullName(),
  email: randEmail(),
  tempoIc: randNumber({ min: 1, max: 999 })
})

describe('Add Professor Controller', () => {
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

  test('Should call AddProfessor with correct values', async () => {
    const { sut, addProfessorSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    const response = {
      ...request,
      data_cadastro: new Date()
    }
    expect(addProfessorSpy.params).toEqual(response)
  })

  test('Should return 500 if AddProfessor throws', async () => {
    const { sut, addProfessorSpy } = makeSut()
    const request = mockRequest()
    jest.spyOn(addProfessorSpy, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    const response = {
      ...request,
      statusCode: 200,
      data_cadastro: new Date()
    }
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok(response))
  })
})
