import type { AddTurmaRepository, LoadTurmaRepository } from '../../../../data/protocols'

import { PostgresHelper } from '../postgres-helper'

export class TurmaPostgresRepository implements AddTurmaRepository,
                                                LoadTurmaRepository {
  async add (data: AddTurmaRepository.Params): Promise<any> {
    const turmaRepository = PostgresHelper.client.manager.getRepository('turmas')
    const disciplinaRepository = PostgresHelper.client.manager.getRepository('disciplinas')
    const { disciplina } = data
    const disciplinaData = await disciplinaRepository.findOneBy({
      id: disciplina
    })
    const createdTurmaData = turmaRepository.create({
      ...data
    })
    if (data.professor) {
      const { professor } = data
      const professorRepository = PostgresHelper.client.manager.getRepository('professores')
      const professorData = await professorRepository.findOneBy({
        id: professor
      })
      createdTurmaData.professor = professorData
    }
    createdTurmaData.disciplina = disciplinaData
    await turmaRepository.save(createdTurmaData)
    return { ...createdTurmaData }
  }

  async loadAll (): Promise<LoadTurmaRepository.Result> {
    const turmaRepository = PostgresHelper.client.manager.getRepository('turmas')
    const listaTurmas = turmaRepository.find()
    return listaTurmas as any ?? []
  }
}
