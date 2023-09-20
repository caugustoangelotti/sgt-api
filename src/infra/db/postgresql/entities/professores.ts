import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Accounts } from './accounts'

@Entity()
export class Professores {
  @PrimaryGeneratedColumn()
    id: number

  @OneToOne(() => Accounts, (account) => account.professor, { cascade: true })
    account: Accounts

  @Column({ type: 'varchar' })
    name: string

  @Column({ type: 'varchar', unique: true })
    email: string

  @Column()
    tempoIc: number

  @Column({ type: 'date' })
    dataCadastro: Date
}
