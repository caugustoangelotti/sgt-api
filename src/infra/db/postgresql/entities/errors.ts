import { Column, PrimaryGeneratedColumn } from 'typeorm'

export class Errors {
  @PrimaryGeneratedColumn()
    id: number

  @Column({ type: 'varchar' })
    error: string

  @Column({ type: 'date' })
    date: Date
}
