import { CheckDisciplinaByIdSpy, UpdateDisciplinaSpy, ValidationSpy } from '../mocks'

import MockDate from 'mockdate'
import { randUuid, randNumber, randTextRange } from '@ngneat/falso'
import { UpdateDisciplinaController } from './update-disciplina-controller'

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
  const sut = new UpdateDisciplinaController(validationSpy)
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
})
