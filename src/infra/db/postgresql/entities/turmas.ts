import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Disciplinas } from './disciplinas'
import { Professores } from './professores'
import { Horarios } from './horarios'

@Entity()
export class Turmas {
  @PrimaryGeneratedColumn()
    id: number

  @ManyToOne(() => Disciplinas, disciplina => disciplina.turmas, { eager: true })
    disciplina: Disciplinas

  @ManyToOne(() => Professores, professor => professor.turmas, { eager: true, nullable: true })
    professor: Professores

  @Column({ type: 'boolean', nullable: true })
    projetor: boolean

  @Column({ type: 'boolean', nullable: true })
    lab: boolean

  @Column({ type: 'boolean', nullable: true })
    aprovada: boolean

  @Column({ type: 'date' })
    dataCadastro: Date

  @ManyToMany(() => Horarios, { cascade: true, eager: true })
  @JoinTable({
    name: 'turma_has_horarios',
    joinColumn: {
      name: 'turmaId',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'horarioId',
      referencedColumnName: 'id'
    }
  })
    horarios: Horarios[]
}
