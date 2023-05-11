import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Professores } from './professores'

@Entity()
export class Accounts {
  @PrimaryGeneratedColumn()
    id: number

  @OneToOne(() => Professores)
  @JoinColumn()
    professor: Professores

  @Column({ type: 'varchar' })
    senha: string

  @Column({ type: 'varchar' })
    accessToken: string

  @Column({ type: 'varchar' })
    role: string
}
