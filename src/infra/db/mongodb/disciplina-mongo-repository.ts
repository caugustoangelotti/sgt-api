import type { AddDisciplinaRepository, CheckDisciplinaByIdRepository, LoadDisciplinaRepository, UpdateDisciplinaRepository } from '../../../data/protocols/db'

import { MongoHelper } from '../../../infra/db/mongodb/mongo-helper'
import { ObjectId } from 'mongodb'
export class DisciplinaMongoRepository implements AddDisciplinaRepository,
LoadDisciplinaRepository, UpdateDisciplinaRepository, CheckDisciplinaByIdRepository {
  async add (data: AddDisciplinaRepository.Params): Promise<any> {
    const disciplinaCollection = MongoHelper.getCollection('disciplinas')
    await disciplinaCollection.insertOne(data)
  }

  async loadAll (): Promise<LoadDisciplinaRepository.Result> {
    const disciplinaCollection = MongoHelper.getCollection('disciplinas')
    const query = disciplinaCollection.find({})
    const disciplinas = await query.toArray()
    return MongoHelper.mapCollection(disciplinas)
  }

  async update (data: UpdateDisciplinaRepository.Params): Promise<UpdateDisciplinaRepository.Result> {
    const disciplinaCollection = MongoHelper.getCollection('disciplinas')
    const { id, ...rest } = data
    const updatedDisciplina = await disciplinaCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...rest } },
      { returnDocument: 'after' }
    )
    return MongoHelper.map(updatedDisciplina.value)
  }

  async checkById (id: number): Promise<CheckDisciplinaByIdRepository.Result> {
    const disciplinaCollection = MongoHelper.getCollection('disciplinas')
    const disciplina = await disciplinaCollection.findOne({
      _id: new ObjectId(id)
    }, {
      projection: {
        _id: 1
      }
    })
    return disciplina !== null
  }
}
