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

  @ManyToMany(() => Professores, { cascade: true, eager: true, nullable: true })
  @JoinTable({
    name: 'turma_has_professores',
    joinColumn: {
      name: 'turmaId',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'professorId',
      referencedColumnName: 'id'
    }
  })
    professores: Professores[]

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
