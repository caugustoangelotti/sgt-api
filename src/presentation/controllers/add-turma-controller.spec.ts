/*
  * cordenadores e diretores podem criar turmas
  * cada turma deve conter uma diciplina, um professor(este podendo ser inicialmente nulo, pois
  * os professores podem ou não escolher a turma a principio), um periodo(SI, CC ou CC/SI) e uma
  * lista de horarios cada um contendo (dia da semana, horario de inicio e fim)
  * turma {
  *  disciplina: disciplina.id,
  *  professor: professor.id,
  *  modelo: string,
  *  semestre: disciplina.semestre,
  *  horarios: [
  *   {dia: string, inicio: string, fim: string},
  *   {dia: string, inicio: string, fim: string}
  *  ]
  * }
*/
import { AddTurmaController } from './add-turma-controller'
import { ValidationSpy, AddTurmaSpy } from '../mocks'

import MockDate from 'mockdate'
import { randNumber, randTextRange, randWeekday, randWord } from '@ngneat/falso'
import { badRequest } from '../helpers'

interface SutTypes {
  sut: AddTurmaController
  addTurmaSpy: AddTurmaSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const addTurmaSpy = new AddTurmaSpy()
  const validationSpy = new ValidationSpy()
  const sut = new AddTurmaController(validationSpy)
  return {
    sut,
    addTurmaSpy,
    validationSpy
  }
}

const mockRequest = (): any => ({
  disciplina: randTextRange({ min: 40, max: 70 }),
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
})