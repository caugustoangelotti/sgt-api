import type { AddProfessorRepository, CheckProfessorByIdRepository, LoadProfessorRepository, UpdateProfessorRepository } from '../../../data/protocols/db/professor'

import { MongoHelper } from '../../../infra/db/mongodb'
import { ObjectId } from 'mongodb'

export class ProfessorMongoRepository implements AddProfessorRepository,
                                                  LoadProfessorRepository,
                                                  CheckProfessorByIdRepository,
                                                  UpdateProfessorRepository {
  async add (data: AddProfessorRepository.Params): Promise<AddProfessorRepository.Result> {
    const professorCollection = MongoHelper.getCollection('professores')
    const professor = await professorCollection.insertOne(data)
    return professor !== null
  }

  async loadAll (): Promise<LoadProfessorRepository.Result> {
    const professorCollection = MongoHelper.getCollection('professores')
    const query = professorCollection.find({})
    const professores = await query.toArray()
    return MongoHelper.mapCollection(professores)
  }

  async update (data: UpdateProfessorRepository.Params): Promise<UpdateProfessorRepository.Result> {
    const professorCollection = MongoHelper.getCollection('professores')
    const { id, ...rest } = data
    const updatedProfessor = await professorCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...rest } },
      { returnDocument: 'after' }
    )
    return MongoHelper.map(updatedProfessor.value)
  }

  async checkById (id: number): Promise<CheckProfessorByIdRepository.Result> {
    const professorCollection = MongoHelper.getCollection('professores')
    const professor = await professorCollection.findOne({
      _id: new ObjectId(id)
    }, {
      projection: {
        _id: 1
      }
    })
    return professor !== null
  }
}
