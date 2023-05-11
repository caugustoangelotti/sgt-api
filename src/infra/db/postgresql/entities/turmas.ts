import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Disciplinas } from './disciplinas'
import { Professores } from './professores'
import { Horarios } from './horarios'

@Entity()
export class Turmas {
  @PrimaryGeneratedColumn()
    id: number

  @ManyToOne(() => Disciplinas, disciplina => disciplina.turmas)
    disciplina: Disciplinas

  @ManyToOne(() => Professores, professor => professor.turmas)
    professor: Professores

  @Column({ type: 'boolean' })
    projetor: boolean

  @Column({ type: 'boolean' })
    lab: boolean

  @Column({ type: 'boolean' })
    aprovada: boolean

  @Column({ type: 'date' })
    dataCriacao: Date

  @ManyToMany(() => Horarios)
  @JoinTable()
    horarios: Horarios[]
}
