/*
  * mudar informacoes relativas ao professor
  * as informacoes podem ser mudadas individualmente ex: nome : "nome"
  * o professor deve ser identificado pelo id
  * o id deve ser valido
  * o retorno deve ser um professor com as informacoes atualizadas
*/

import { noContent, ok, serverError } from '../helpers'
import { UpdateProfessorSpy, ValidationSpy } from '../mocks'
import { UpdateProfessorController } from './update-professor-controller'

import MockDate from 'mockdate'
import { randFullName, randUuid, randEmail } from '@ngneat/falso'

interface SutTypes {
  sut: UpdateProfessorController
  updateProfessorSpy: UpdateProfessorSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const updateProfessorSpy = new UpdateProfessorSpy()
  const validationSpy = new ValidationSpy()
  const sut = new UpdateProfessorController(updateProfessorSpy, validationSpy)
  return {
    sut,
    updateProfessorSpy,
    validationSpy
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

  test('Should call UpdateProfessor with correct values', async () => {
    const { sut, updateProfessorSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    const response = {
      ...request
    }
    expect(updateProfessorSpy.params).toEqual(response)
  })

  test('Should return 500 if AddProfessor throws', async () => {
    const { sut, updateProfessorSpy } = makeSut()
    const request = mockRequest()
    jest.spyOn(updateProfessorSpy, 'update').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 if professor id not exists', async () => {
    const { sut, updateProfessorSpy } = makeSut()
    jest.spyOn(updateProfessorSpy, 'update').mockReturnValueOnce(Promise.resolve(false))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 200 and professor data on success', async () => {
    const { sut } = makeSut()
    const request = mockRequest()

    const response = {
      ...request,
      data_cadastro: new Date(),
      tempoIc: 10
    }
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok(response))
  })
})
