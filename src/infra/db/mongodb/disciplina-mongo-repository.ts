import { MongoHelper } from '../../../infra/db/mongodb/mongo-helper'
import type { AddDisciplinaRepository, LoadDisciplinaRepository } from '../../../data/protocols/db'

export class DisciplinaMongoRepository implements AddDisciplinaRepository, LoadDisciplinaRepository {
  async add (data: AddDisciplinaRepository.Params): Promise<void> {
    const professorCollection = MongoHelper.getCollection('disciplinas')
    await professorCollection.insertOne(data)
  }

  async loadAll (): Promise<LoadDisciplinaRepository.Result> {
    const disciplinasCollection = MongoHelper.getCollection('disciplinas')
    const query = disciplinasCollection.find({})
    const disciplinas = await query.toArray()
    return MongoHelper.mapCollection(disciplinas)
  }
}
