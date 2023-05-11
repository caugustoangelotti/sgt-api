import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import type { DisciplinaModel } from '../../domain/models'

@Entity()
export class Disciplina implements DisciplinaModel {
  @PrimaryGeneratedColumn()
    id: string

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
}
