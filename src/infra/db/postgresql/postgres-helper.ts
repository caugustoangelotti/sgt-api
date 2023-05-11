import { DataSource } from 'typeorm'
import env from '../../../main/config/env'

export const PostgresHelper = {
  client: null as unknown as DataSource,

  async initialize (): Promise<void> {
    const ds = new DataSource({
      type: 'postgres',
      url: env.postgresUrl,
      entities: ['E:\\DEV\\sgt-api\\src\\data\\entities\\*.ts'],
      migrations: ['../../data/migrations/*.ts'],
      synchronize: true,
      logging: false
    })
    this.client = await ds.initialize()
  }
}
