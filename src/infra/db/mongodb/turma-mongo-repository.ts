import { MongoHelper } from '../../../infra/db/mongodb/mongo-helper'
import type { AddTurmaRepository, LoadTurmaRepository } from '../../../data/protocols'

export class TurmaMongoRepository implements AddTurmaRepository, LoadTurmaRepository {
  async add (data: AddTurmaRepository.Params): Promise<void> {
    const turmaCollection = MongoHelper.getCollection('turmas')
    await turmaCollection.insertOne(data)
  }

  async loadAll (): Promise<LoadTurmaRepository.Result> {
    const turmasCollection = MongoHelper.getCollection('turmas')
    const query = turmasCollection.find({})
    const turmas = await query.toArray()
    return MongoHelper.mapCollection(turmas)
  }
}
