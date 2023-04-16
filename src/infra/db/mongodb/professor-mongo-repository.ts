import type { AddProfessorRepository, LoadProfessorRepository } from '../../../data/protocols/db/professor'

import { MongoHelper } from '../../../infra/db/mongodb'

export class ProfessorMongoRepository implements AddProfessorRepository {
  async add (data: AddProfessorRepository.Params): Promise<void> {
    const professorCollection = MongoHelper.getCollection('professores')
    await professorCollection.insertOne(data)
  }

  async loadAll (): Promise<LoadProfessorRepository.Result> {
    const professorCollection = MongoHelper.getCollection('professores')
    const query = professorCollection.find({})
    const professores = await query.toArray()
    return MongoHelper.mapCollection(professores)
  }
}
