import 'reflect-metadata'
import env from './config/env'
import { Disciplinas, Horarios, PostgresHelper, Professores, Turmas } from '../infra/db/postgresql'

PostgresHelper.initialize()
  .then(async () => {
    const { setupApp } = await import('./config/app')
    const app = await setupApp()
    const disi = new Disciplinas()
    disi.codigo = '123'
    disi.name = 'teste'
    disi.semestre = 1
    disi.cargaHoraria = 1
    disi.dataCadastro = new Date()
    await PostgresHelper.client.manager.save(disi)
    const prof = new Professores()
    prof.email = 'mail@mail.com'
    prof.name = 'teste'
    prof.tempoIc = 1
    prof.dataCadastro = new Date()
    await PostgresHelper.client.manager.save(prof)
    const horario = new Horarios()
    horario.dia = 'segunda'
    horario.inicio = '08:00'
    horario.fim = '10:00'
    horario.sala = 'CB 04'
    const horario2 = new Horarios()
    horario2.dia = 'terca'
    horario2.inicio = '08:00'
    horario2.fim = '10:00'
    horario2.sala = 'CB 04'
    await PostgresHelper.client.manager.save(horario)
    await PostgresHelper.client.manager.save(horario2)
    const turma = new Turmas()
    turma.aprovada = true
    turma.dataCriacao = new Date()
    turma.lab = true
    turma.projetor = true
    turma.disciplina = disi
    turma.professor = prof
    turma.horarios = [horario, horario2]
    await PostgresHelper.client.manager.save(turma)
    app.listen(env.port, () => { console.log(`Server running at http://localhost:${env.port}`) })
  })
  .catch(console.error)
