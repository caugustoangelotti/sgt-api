import type { AddProfessor } from '../../domain/usecases'
import type { AddProfessorRepository, CheckAccountByEmailRepository, Hasher } from '../../data/protocols'

export class DbAddProfessor implements AddProfessor {
  constructor (
    private readonly addProfessorRepository: AddProfessorRepository,
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private readonly hasher: Hasher
  ) {}

  async add (data: AddProfessor.Params): Promise<AddProfessor.Result> {
    const exists = await this.checkAccountByEmailRepository.checkByEmail(data.email)
    let isValid = false
    if (!exists) {
      const hashedPassword = await this.hasher.hash(data.password)
      isValid = await this.addProfessorRepository.add({ ...data, password: hashedPassword })
    }
    return isValid
  }
}
