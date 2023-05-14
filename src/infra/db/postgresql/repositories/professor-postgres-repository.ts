import type { AddProfessorRepository } from '../../../../data/protocols'
import { PostgresHelper } from '../postgres-helper'

export class ProfessorPostgresRepository implements AddProfessorRepository {
  async add (data: AddProfessorRepository.Params): Promise<void> {
    const professorRepository = PostgresHelper.client.manager.getRepository('professores')
    const professor = professorRepository.create(data)
    await professorRepository.save(professor)
  }
}
