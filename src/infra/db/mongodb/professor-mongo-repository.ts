import { MongoHelper } from '../../../infra/db/mongodb/mongo-helper'
import type { AddProfessorRepository } from '../../../data/protocols/db/professor/add-professor-repository'

export class ProfessorMongoRepository implements AddProfessorRepository {
  async add (data: AddProfessorRepository.Params): Promise<void> {
    const professorCollection = MongoHelper.getCollection('professores')
    const accountsCollection = MongoHelper.getCollection('accounts')
    await accountsCollection.insertOne({})
    await professorCollection.insertOne(data)
  }
}
