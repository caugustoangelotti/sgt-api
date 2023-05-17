import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Professores } from './professores'

@Entity()
export class Accounts {
  @PrimaryGeneratedColumn()
    id: number

  @OneToOne(() => Professores, (professor) => professor.account, { nullable: false })
  @JoinColumn({
    name: 'professorId'
  })
    professor: Professores

  @Column({ type: 'varchar', nullable: false })
    password: string

  @Column({ type: 'varchar', nullable: true })
    accessToken: string

  @Column({ type: 'varchar', nullable: true })
    role: string
}
