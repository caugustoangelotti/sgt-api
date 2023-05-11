import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Horarios {
  @PrimaryGeneratedColumn()
    id: number

  @Column({ type: 'varchar' })
    dia: string

  @Column({ type: 'varchar' })
    inicio: string

  @Column({ type: 'varchar' })
    fim: string

  @Column({ type: 'varchar' })
    sala: string
}
