import type { AddDisciplinaRepository, CheckDisciplinaByIdRepository, GetDisciplinaByIdRepository, LoadDisciplinaRepository, RemoveDisciplinaRepository, UpdateDisciplinaRepository } from '../../../../data/protocols'
import type { Disciplinas } from '../entities'

import { PostgresHelper } from '../postgres-helper'

export class DisciplinaPostgresRepository implements AddDisciplinaRepository,
                                                    LoadDisciplinaRepository,
                                                    UpdateDisciplinaRepository,
                                                    CheckDisciplinaByIdRepository,
                                                    GetDisciplinaByIdRepository,
                                                    RemoveDisciplinaRepository {
  async add (data: AddDisciplinaRepository.Params): Promise<any> {
    const disciplinaRepository = PostgresHelper.client.manager.getRepository('disciplinas')
    const createdDisciplinaData = disciplinaRepository.create(data)
    await disciplinaRepository.insert(createdDisciplinaData)
    return { ...createdDisciplinaData }
  }

  async loadAll (): Promise<LoadDisciplinaRepository.Result> {
    const disciplinaRepository = PostgresHelper.client.manager.getRepository('disciplinas')
    const listaDisciplinas = disciplinaRepository.find()
    return listaDisciplinas as any ?? []
  }

  async update (data: UpdateDisciplinaRepository.Params): Promise<UpdateDisciplinaRepository.Result> {
    const disciplinaRepository = PostgresHelper.client.manager.getRepository('disciplinas')
    const { id } = data
    await disciplinaRepository.update(id, {
      ...data
    })
    const updatedDisciplinaData = await disciplinaRepository.findOneBy({
      id
    })
    return updatedDisciplinaData as any
  }

  async checkById (id: number): Promise<CheckDisciplinaByIdRepository.Result> {
    const disciplinaRepository = PostgresHelper.client.manager.getRepository('disciplinas')
    const disciplina = await disciplinaRepository.findOneBy({
      id
    })
    return disciplina !== null
  }

  async getById (id: number): Promise<GetDisciplinaByIdRepository.Result> {
    const professorRepository = PostgresHelper.client.manager.getRepository('disciplinas')
    const account = await professorRepository.findOneBy({
      id
    })
    return account as Disciplinas
  }

  async remove (id: number): Promise<RemoveDisciplinaRepository.Result> {
    const disciplinaRepository = PostgresHelper.client.manager.getRepository('disciplinas')
    await disciplinaRepository.delete(id)
    return true
  }
}
