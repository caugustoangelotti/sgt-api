import { MongoHelper } from '../../../infra/db/mongodb'
import type { LogErrorRepository } from '../../../data/protocols/db/log'

export class LogMongoRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorCollection = MongoHelper.getCollection('errors')
    await errorCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}
