import type { AddProfessorRepository, CheckProfessorByIdRepository, GetProfessorByIdRepository, LoadProfessorRepository, RemoveProfessorRepository, UpdateProfessorRepository } from '../../../../data/protocols'
import { Accounts, type Professores } from '../entities'

import { PostgresHelper } from '../postgres-helper'

export class ProfessorPostgresRepository implements AddProfessorRepository,
                                                    LoadProfessorRepository,
                                                    UpdateProfessorRepository,
                                                    CheckProfessorByIdRepository,
                                                    GetProfessorByIdRepository,
                                                    RemoveProfessorRepository {
  async add (data: AddProfessorRepository.Params): Promise<AddProfessorRepository.Result> {
    const professorRepository = PostgresHelper.client.manager.getRepository('professores')
    const { name, email, tempoIc, dataCadastro, password, role } = data
    const professor = professorRepository.create({
      name,
      email,
      tempoIc,
      dataCadastro
    })
    const account = new Accounts()
    account.password = password
    if (role) {
      account.role = role
    }
    professor.account = account
    const status = await professorRepository.save(professor)
    return status !== null
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

  async getById (id: number): Promise<GetProfessorByIdRepository.Result> {
    const professorRepository = PostgresHelper.client.manager.getRepository('professores')
    const account = await professorRepository.findOneBy({
      id
    })
    return account as Professores
  }

  async remove (id: number): Promise<RemoveProfessorRepository.Result> {
    const professorRepository = PostgresHelper.client.manager.getRepository('professores')
    await professorRepository.delete(id)
    return true
  }
}
