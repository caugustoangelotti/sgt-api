import type { AddProfessor } from 'domain/usecases/add-professor'
import { MissingParamError } from '../errors'
import { ok, badRequest } from '../helpers/http-helper'
import type { Controller } from '../protocols/controller'
import type { HttpRequest, HttpResponse } from '../protocols/http'

export class AddProfessorController implements Controller {
  constructor (
    private readonly addProfessor: AddProfessor
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['name', 'email', 'tempoIc']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    return ok(httpRequest.body)
  }
}
