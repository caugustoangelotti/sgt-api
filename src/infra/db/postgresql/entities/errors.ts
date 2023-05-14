import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
@Entity()
export class Errors {
  @PrimaryGeneratedColumn()
    id: number

  @Column({ type: 'varchar' })
    error: string

  @Column({ type: 'date' })
    date: Date
}
