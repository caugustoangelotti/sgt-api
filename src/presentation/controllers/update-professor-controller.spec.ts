/*
  * mudar informacoes relativas ao professor
  * as informacoes podem ser alteradas individualmente ex: nome : "nome"
  * o professor deve ser identificado pelo id
  * o id deve ser valido
  * informações opcionais: name, email e tempo_ic quaisquer outras devem ser descartadas
  * o retorno deve ser um professor(id, name, email, tempo_ic) com as informacoes atualizadas
*/

import { badRequest, ok, serverError } from '../helpers'
import { CheckProfessorByIdSpy, UpdateProfessorSpy, ValidationSpy } from '../mocks'
import { UpdateProfessorController } from './update-professor-controller'

import MockDate from 'mockdate'
import { randFullName, randUuid, randEmail } from '@ngneat/falso'
import { InvalidParamError } from '../errors'

interface SutTypes {
  sut: UpdateProfessorController
  updateProfessorSpy: UpdateProfessorSpy
  validationSpy: ValidationSpy
  checkProfessorByIdSpy: CheckProfessorByIdSpy
}

const makeSut = (): SutTypes => {
  const updateProfessorSpy = new UpdateProfessorSpy()
  const validationSpy = new ValidationSpy()
  const checkProfessorByIdSpy = new CheckProfessorByIdSpy()
  const sut = new UpdateProfessorController(updateProfessorSpy, validationSpy, checkProfessorByIdSpy)
  return {
    sut,
    updateProfessorSpy,
    validationSpy,
    checkProfessorByIdSpy
  }
}

const mockRequest = (): UpdateProfessorController.Request => ({
  id: randUuid(),
  name: randFullName(),
  email: randEmail()
})

describe('Update Professor Controller', () => {
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

  test('Should call CheckProfessorById with correct value', async () => {
    const { sut, checkProfessorByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(checkProfessorByIdSpy.id).toBe(request.id)
  })

  test('Should call UpdateProfessor with correct values', async () => {
    const { sut, updateProfessorSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    const response = {
      ...request
    }
    expect(updateProfessorSpy.params).toEqual(response)
  })

  test('Should return 500 if UpdateProfessor throws', async () => {
    const { sut, updateProfessorSpy } = makeSut()
    const request = mockRequest()
    jest.spyOn(updateProfessorSpy, 'update').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 500 if CheckSurveyById throws', async () => {
    const { sut, checkProfessorByIdSpy } = makeSut()
    const request = mockRequest()
    jest.spyOn(checkProfessorByIdSpy, 'checkById').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new Error()))
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

  test('Should return 400 if CheckSurveyById returns false', async () => {
    const { sut, checkProfessorByIdSpy } = makeSut()
    checkProfessorByIdSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('id')))
  })

  test('Should return 200 and updated professor data on success', async () => {
    const { sut } = makeSut()
    const request = mockRequest()

    const response = {
      ...request,
      data_cadastro: new Date(),
      tempo_ic: 10
    }
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok(response))
  })
})
