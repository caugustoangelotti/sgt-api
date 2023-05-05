import { CheckDisciplinaByIdSpy, UpdateDisciplinaSpy, ValidationSpy } from '../mocks'

import MockDate from 'mockdate'
import { randUuid, randNumber, randTextRange } from '@ngneat/falso'
import { UpdateDisciplinaController } from './update-disciplina-controller'
import { badRequest } from '../helpers'

interface SutTypes {
  sut: UpdateDisciplinaController
  updateDisciplinaSpy: UpdateDisciplinaSpy
  validationSpy: ValidationSpy
  checkDisciplinaByIdSpy: CheckDisciplinaByIdSpy
}

const makeSut = (): SutTypes => {
  const updateDisciplinaSpy = new UpdateDisciplinaSpy()
  const validationSpy = new ValidationSpy()
  const checkDisciplinaByIdSpy = new CheckDisciplinaByIdSpy()
  const sut = new UpdateDisciplinaController(validationSpy, checkDisciplinaByIdSpy)
  return {
    sut,
    updateDisciplinaSpy,
    validationSpy,
    checkDisciplinaByIdSpy
  }
}

const mockRequest = (): any => ({
  id: randUuid(),
  name: randTextRange({ min: 40, max: 70 }),
  semestre: randNumber({ min: 1, max: 8 }),
  codigo: randNumber({ min: 10000000, max: 99999999 }).toString(),
  any_field: 'any_value'
})

describe('Update Disciplina Controller', () => {
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

  test('Should call CheckDisciplinaById with correct value', async () => {
    const { sut, checkDisciplinaByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(checkDisciplinaByIdSpy.id).toBe(request.id)
  })
})
