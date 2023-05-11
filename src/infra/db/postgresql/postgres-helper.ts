import { DataSource } from 'typeorm'
import env from '../../../main/config/env'
import path from 'path'

export const PostgresHelper = {
  client: null as unknown as DataSource,

  async initialize (): Promise<void> {
    const ds = new DataSource({
      type: 'postgres',
      url: env.postgresUrl,
      entities: [path.join(__dirname, '/entities/*.ts')],
      migrations: [path.join(__dirname, '/migrations/*.ts')],
      synchronize: true,
      logging: false
    })
    this.client = await ds.initialize()
  }
}
