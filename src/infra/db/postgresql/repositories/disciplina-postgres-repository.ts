import type { AddDisciplinaRepository, CheckDisciplinaByIdRepository, LoadDisciplinaRepository, RemoveDisciplinaRepository, UpdateDisciplinaRepository } from '../../../../data/protocols'
import { PostgresHelper } from '../postgres-helper'

export class DisciplinaPostgresRepository implements AddDisciplinaRepository,
                                                    LoadDisciplinaRepository,
                                                    UpdateDisciplinaRepository,
                                                    CheckDisciplinaByIdRepository,
                                                    RemoveDisciplinaRepository {
  async add (data: AddDisciplinaRepository.Params): Promise<void> {
    const disciplinaRepository = PostgresHelper.client.manager.getRepository('disciplinas')
    const createdDisciplinaData = disciplinaRepository.create(data)
    await disciplinaRepository.save(createdDisciplinaData)
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

  async remove (id: number): Promise<RemoveDisciplinaRepository.Result> {
    const disciplinaRepository = PostgresHelper.client.manager.getRepository('disciplinas')
    await disciplinaRepository.delete(id)
    return true
  }
}
