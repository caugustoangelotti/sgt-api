import type { LogErrorRepository } from '../../../../data/protocols'
import { PostgresHelper } from '../postgres-helper'

export class LogPostgresRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const logsRepository = PostgresHelper.client.manager.getRepository('errors')
    const log = logsRepository.create({ error: stack, date: new Date() })
    await logsRepository.save(log)
  }
}
