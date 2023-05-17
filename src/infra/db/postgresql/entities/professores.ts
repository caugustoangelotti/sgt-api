import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Turmas } from './turmas'
import { Accounts } from './accounts'

@Entity()
export class Professores {
  @PrimaryGeneratedColumn()
    id: number

  @OneToOne(() => Accounts, (account) => account.professor, { cascade: true })
    account: number

  @Column({ type: 'varchar' })
    name: string

  @Column({ type: 'varchar', unique: true })
    email: string

  @Column()
    tempoIc: number

  @Column({ type: 'date' })
    dataCadastro: Date

  @OneToMany(() => Turmas, (turmas) => turmas.professor)
    turmas: Turmas[]
}
