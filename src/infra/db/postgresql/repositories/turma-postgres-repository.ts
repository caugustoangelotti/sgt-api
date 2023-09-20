import type { AddTurmaRepository, LoadTurmaRepository } from '../../../../data/protocols'

import { PostgresHelper } from '../postgres-helper'

export class TurmaPostgresRepository implements AddTurmaRepository,
                                                LoadTurmaRepository {
  async add (data: AddTurmaRepository.Params): Promise<any> {
    const turmaRepository = PostgresHelper.client.manager.getRepository('turmas')
    const turma = turmaRepository.create(data)
    await turmaRepository.save(turma)
    return { ...turma }
  }

  async loadAll (): Promise<LoadTurmaRepository.Result> {
    const turmaRepository = PostgresHelper.client.manager.getRepository('turmas')
    const listaTurmas = turmaRepository.find()
    return listaTurmas as any ?? []
  }
}
