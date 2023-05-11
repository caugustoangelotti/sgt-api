import 'reflect-metadata'
import env from './config/env'
import { PostgresHelper } from '../infra/db/postgresql'
import { Zeka } from '../data/entities/zeka'

PostgresHelper.initialize()
  .then(async () => {
    const zk = new Zeka()
    zk.name = 'Zeka'
    await PostgresHelper.client.manager.save(zk)
    const { setupApp } = await import('./config/app')
    const app = await setupApp()
    app.listen(env.port, () => { console.log(`Server running at http://localhost:${env.port}`) })
  })
  .catch(console.error)
