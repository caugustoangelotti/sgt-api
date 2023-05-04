import { ok, serverError } from '../helpers'
import { LoadDisciplinaSpy } from '../mocks'

import MockDate from 'mockdate'
import { LoadDisciplinaController } from './load-disciplina-controller'

interface SutTypes {
  sut: LoadDisciplinaController
  loadDisciplinaSpy: LoadDisciplinaSpy
}

const makeSut = (): SutTypes => {
  const loadDisciplinaSpy = new LoadDisciplinaSpy()
  const sut = new LoadDisciplinaController(loadDisciplinaSpy)
  return {
    sut,
    loadDisciplinaSpy
  }
}

describe('Load Disciplina Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should return 500 if LoadDisciplina throws', async () => {
    const { sut, loadDisciplinaSpy } = makeSut()
    jest.spyOn(loadDisciplinaSpy, 'load').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 and disciplina data on success', async () => {
    const { sut, loadDisciplinaSpy } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok(loadDisciplinaSpy.result))
  })
})
