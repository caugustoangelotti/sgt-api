import { AddTurmaController } from './add-turma-controller'
import { ValidationSpy, AddTurmaSpy, CheckDisciplinaByIdSpy } from '../mocks'

import MockDate from 'mockdate'
import { randNumber, randWeekday, randWord } from '@ngneat/falso'
import { badRequest, ok, serverError } from '../helpers'

interface SutTypes {
  sut: AddTurmaController
  addTurmaSpy: AddTurmaSpy
  checkProfessorByIdSpy: CheckDisciplinaByIdSpy
  checkDisciplinaByIdSpy: CheckDisciplinaByIdSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const addTurmaSpy = new AddTurmaSpy()
  const checkProfessorByIdSpy = new CheckDisciplinaByIdSpy()
  const checkDisciplinaByIdSpy = new CheckDisciplinaByIdSpy()
  const validationSpy = new ValidationSpy()
  const sut = new AddTurmaController(addTurmaSpy, checkProfessorByIdSpy, checkDisciplinaByIdSpy, validationSpy)
  return {
    sut,
    addTurmaSpy,
    checkProfessorByIdSpy,
    checkDisciplinaByIdSpy,
    validationSpy
  }
}

const mockRequest = (): any => ({
  disciplina: randNumber({ min: 1, max: 9999 }),
  horarios: [
    { dia: randWeekday(), inicio: `${randNumber({ min: 0, max: 23 })}:${randNumber({ min: 0, max: 59 })}`, fim: `${randNumber({ min: 0, max: 23 })}:${randNumber({ min: 0, max: 59 })}` },
    { dia: randWeekday(), inicio: `${randNumber({ min: 0, max: 23 })}:${randNumber({ min: 0, max: 59 })}`, fim: `${randNumber({ min: 0, max: 23 })}:${randNumber({ min: 0, max: 59 })}` }
  ],
  modelo: randWord()
})

describe('Add Turma Controller', () => {
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

  test('Should call AddTurma with correct values', async () => {
    const { sut, addTurmaSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    const response = {
      ...request,
      dataCadastro: new Date()
    }
    expect(addTurmaSpy.params).toEqual(response)
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

  test('Should return 500 if AddTurma throws', async () => {
    const { sut, addTurmaSpy } = makeSut()
    const request = mockRequest()
    jest.spyOn(addTurmaSpy, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 and turma data on success', async () => {
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
