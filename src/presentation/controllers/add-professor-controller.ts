import type { AddProfessor } from 'domain/usecases/add-professor'
import { MissingParamError } from '../errors'
import { ok, badRequest, serverError } from '../helpers/http-helper'
import type { Controller } from '../protocols/controller'
import type { HttpRequest, HttpResponse } from '../protocols/http'

export class AddProfessorController implements Controller {
  constructor (
    private readonly addProfessor: AddProfessor
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'tempoIc']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const professor = {
        name: httpRequest.body.name,
        email: httpRequest.body.email,
        tempoIc: httpRequest.body.tempoIc
      }

      await this.addProfessor.add(professor)
      return ok(httpRequest.body)
    } catch (error) {
      return serverError(error)
    }
  }
}
