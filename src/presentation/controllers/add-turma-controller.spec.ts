import { AddTurmaController } from './add-turma-controller'
import { ValidationSpy, AddTurmaSpy, GetDisciplinaByIdSpy, GetProfessorByIdSpy } from '../mocks'
import { badRequest, ok, serverError } from '../helpers'
import type { Disciplinas } from '../../infra/db'

import MockDate from 'mockdate'
import { randNumber, randWeekday, randWord, randTextRange } from '@ngneat/falso'

interface SutTypes {
  sut: AddTurmaController
  addTurmaSpy: AddTurmaSpy
  getProfessorByIdSpy: GetProfessorByIdSpy
  getDisciplinaByIdSpy: GetDisciplinaByIdSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const addTurmaSpy = new AddTurmaSpy()
  const getProfessorByIdSpy = new GetProfessorByIdSpy()
  const getDisciplinaByIdSpy = new GetDisciplinaByIdSpy()
  const validationSpy = new ValidationSpy()
  const sut = new AddTurmaController(addTurmaSpy, getProfessorByIdSpy, getDisciplinaByIdSpy, validationSpy)
  return {
    sut,
    addTurmaSpy,
    getProfessorByIdSpy,
    getDisciplinaByIdSpy,
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

const mockDisciplina = (): Disciplinas => ({
  id: randNumber({ min: 10000000, max: 99999999 }),
  name: randTextRange({ min: 40, max: 70 }),
  semestre: randNumber({ min: 1, max: 8 }),
  codigo: randNumber({ min: 10000000, max: 99999999 }).toString(),
  cargaHoraria: randNumber({ min: 20, max: 100 }),
  dataCadastro: new Date(),
  turmas: []
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
    const { sut, addTurmaSpy, getDisciplinaByIdSpy } = makeSut()
    const disciplinaData = mockDisciplina()
    const request = mockRequest()
    disciplinaData.id = request.id
    getDisciplinaByIdSpy.disciplina = disciplinaData
    await sut.handle(request)
    const { disciplina, ...rest } = request
    const response = {
      ...rest,
      disciplina: disciplinaData,
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
    const { sut, getDisciplinaByIdSpy } = makeSut()
    const request = mockRequest()
    const disciplinaData = mockDisciplina()
    disciplinaData.id = request
    getDisciplinaByIdSpy.disciplina = disciplinaData
    const { disciplina, ...rest } = request
    const response = {
      ...rest,
      disciplina: disciplinaData,
      dataCadastro: new Date()
    }

    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok(response))
  })
})
