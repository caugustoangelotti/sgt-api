import { ValidationSpy } from '../mocks'
import { AddDisciplinaSpy } from '../mocks/mock-disciplina'
import { AddDisciplinaController } from './add-disciplina-controller'

import { randUuid, randNumber, randTextRange } from '@ngneat/falso'

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
  semestre: randNumber(),
  codigo: randUuid()
})

describe('Add Disciplina Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
})
