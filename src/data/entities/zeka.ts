import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Zeka {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    name: string
}
