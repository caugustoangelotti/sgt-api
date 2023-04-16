import { ok, serverError } from '../helpers'
import { LoadProfessorSpy } from '../mocks'
import { LoadProfessorController } from './load-professor-controller'

import MockDate from 'mockdate'

interface SutTypes {
  sut: LoadProfessorController
  loadProfessorSpy: LoadProfessorSpy
}

const makeSut = (): SutTypes => {
  const loadProfessorSpy = new LoadProfessorSpy()
  const sut = new LoadProfessorController(loadProfessorSpy)
  return {
    sut,
    loadProfessorSpy
  }
}

describe('Load professor Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should return 500 if LoadProfessor throws', async () => {
    const { sut, loadProfessorSpy } = makeSut()
    jest.spyOn(loadProfessorSpy, 'load').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 and professor data on success', async () => {
    const { sut, loadProfessorSpy } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok(loadProfessorSpy.result))
  })
})
