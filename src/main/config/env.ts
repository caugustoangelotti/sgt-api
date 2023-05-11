export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost:27017/sgt-api',
  postgresUrl: process.env.POSTGRES_URL ?? 'postgres://postgres:postgres@localhost:5432/sgt-api',
  port: process.env.PORT ?? 5050,
  jwtSecret: process.env.JWT_SECRET ?? 'tj67O==5H'
}
