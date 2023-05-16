import type { AddProfessorRepository, CheckProfessorByIdRepository, LoadProfessorRepository, RemoveProfessorRepository, UpdateProfessorRepository } from '../../../../data/protocols'
import { PostgresHelper } from '../postgres-helper'

export class ProfessorPostgresRepository implements AddProfessorRepository,
                                                    LoadProfessorRepository,
                                                    UpdateProfessorRepository,
                                                    CheckProfessorByIdRepository,
                                                    RemoveProfessorRepository {
  async add (data: AddProfessorRepository.Params): Promise<void> {
    const professorRepository = PostgresHelper.client.manager.getRepository('professores')
    const professor = professorRepository.create(data)
    await professorRepository.save(professor)
  }

  async loadAll (): Promise<LoadProfessorRepository.Result> {
    const professorRepository = PostgresHelper.client.manager.getRepository('professores')
    const listaProfessores = professorRepository.find()
    return listaProfessores as any ?? []
  }

  async update (data: UpdateProfessorRepository.Params): Promise<UpdateProfessorRepository.Result> {
    const professorRepository = PostgresHelper.client.manager.getRepository('professores')
    const { id } = data
    await professorRepository.update(id, {
      ...data
    })
    const professorData = await professorRepository.findOneBy({
      id
    })
    return professorData as any
  }

  async checkById (id: number): Promise<CheckProfessorByIdRepository.Result> {
    const professorRepository = PostgresHelper.client.manager.getRepository('professores')
    const account = await professorRepository.findOneBy({
      id
    })
    return account !== null
  }

  async remove (id: number): Promise<RemoveProfessorRepository.Result> {
    const professorRepository = PostgresHelper.client.manager.getRepository('professores')
    await professorRepository.delete(id)
    return true
  }
}
