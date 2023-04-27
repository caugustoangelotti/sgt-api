import { MongoHelper } from '../../../infra/db/mongodb/mongo-helper'
import type { AddTurmaRepository } from '../../../data/protocols'

export class TurmaMongoRepository implements AddTurmaRepository {
  async add (data: AddTurmaRepository.Params): Promise<void> {
    const turmaCollection = MongoHelper.getCollection('turmas')
    await turmaCollection.insertOne(data)
  }
}
