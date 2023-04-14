import { MongoHelper } from '../../../infra/db/mongodb/mongo-helper'
import type { AddDisciplinaRepository } from '../../../data/protocols/db'

export class DisciplinaMongoRepository implements AddDisciplinaRepository {
  async add (data: AddDisciplinaRepository.Params): Promise<void> {
    const professorCollection = MongoHelper.getCollection('disciplinas')
    await professorCollection.insertOne(data)
  }
}
