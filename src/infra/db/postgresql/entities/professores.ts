import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import type { ProfessorModel } from '../../../../domain/models'
import { Turmas } from './turmas'

@Entity()
export class Professores implements ProfessorModel {
  @PrimaryGeneratedColumn()
    id: number

  @Column({ type: 'varchar' })
    email: string

  @Column({ type: 'varchar' })
    name: string

  @Column()
    tempoIc: number

  @Column({ type: 'date' })
    dataCadastro: Date

  @OneToMany(() => Turmas, (turmas) => turmas.professor)
    turmas: Turmas[]
}
