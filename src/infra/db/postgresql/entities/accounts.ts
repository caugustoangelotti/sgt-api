import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Accounts {
  @PrimaryGeneratedColumn()
    id: number

  @Column({ type: 'varchar' })
    name: string

  @Column({ type: 'varchar' })
    email: string

  @Column({ type: 'varchar' })
    password: string

  @Column({ type: 'varchar', nullable: true })
    accessToken: string

  @Column({ type: 'varchar', nullable: true })
    role: string
}
