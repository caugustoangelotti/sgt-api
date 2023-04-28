import { ok, serverError } from '../helpers'
import { LoadTurmaSpy } from '../mocks'

import MockDate from 'mockdate'
import { LoadTurmaController } from './load-turma-controller'

interface SutTypes {
  sut: LoadTurmaController
  loadTurmaSpy: LoadTurmaSpy
}

const makeSut = (): SutTypes => {
  const loadTurmaSpy = new LoadTurmaSpy()
  const sut = new LoadTurmaController(loadTurmaSpy)
  return {
    sut,
    loadTurmaSpy
  }
}

describe('Load Turma Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should return 500 if LoadTurma throws', async () => {
    const { sut, loadTurmaSpy } = makeSut()
    jest.spyOn(loadTurmaSpy, 'load').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 and turma data on success', async () => {
    const { sut, loadTurmaSpy } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok(loadTurmaSpy.result))
  })
})
