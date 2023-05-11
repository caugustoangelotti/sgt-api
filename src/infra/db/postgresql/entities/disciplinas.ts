import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import type { DisciplinaModel } from '../../../../domain/models'
import { Turmas } from './turmas'

@Entity()
export class Disciplinas implements DisciplinaModel {
  @PrimaryGeneratedColumn()
    id: number

  @Column({ type: 'varchar' })
    codigo: string

  @Column({ type: 'varchar' })
    name: string

  @Column({ type: 'integer' })
    semestre: number

  @Column()
    cargaHoraria: number

  @Column({ type: 'date' })
    dataCadastro: Date

  @OneToMany(() => Turmas, (turmas) => turmas.disciplina)
    turmas: Turmas[]
}
