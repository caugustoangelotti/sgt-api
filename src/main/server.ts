import 'reflect-metadata'
import env from './config/env'
import { PostgresHelper } from '../infra/db/postgresql'
import { MongoHelper } from '../infra/db'

PostgresHelper.initialize()
  .then(async () => {
    await MongoHelper.connect(env.mongoUrl)
    const { setupApp } = await import('./config/app')
    const app = await setupApp()
    app.listen(env.port, () => { console.log(`Server running at http://localhost:${env.port}`) })
  })
  .catch(console.error)
