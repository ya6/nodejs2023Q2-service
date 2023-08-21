import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column({ default: 1 })
  version: number;

  @Column({ type: 'int' })
  createdAt: number;

  @Column({ type: 'int' })
  updatedAt: number;

  @BeforeInsert()
  public setCreatedAt() {
    this.createdAt = Math.floor(Date.now() / 1000);
    this.updatedAt = Math.floor(Date.now() / 1000);
  }

  @BeforeUpdate()
  public setUpdatedAt() {
    this.updatedAt = Math.floor(Date.now() / 1000);
  }
}

// @Column({ type: 'bigint' })
// // @Type(() => Number) check for it
// createdAt: number;

// @Column({ type: 'bigint' })
// // @Type(() => Number) check for it
// updatedAt: number;
