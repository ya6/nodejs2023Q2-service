import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  version: number;

  @Column({ type: 'bigint' })
  // @Type(() => Number) check for it
  createdAt: number;

  @Column({ type: 'bigint' })
  // @Type(() => Number) check for it
  updatedAt: number;
}
