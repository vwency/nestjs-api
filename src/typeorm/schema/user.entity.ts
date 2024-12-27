import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Columns } from './column.entity';
import { Cards } from './card.entity';
import { Comments } from './comment.entity';

@Entity('Users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  user_id: uuidv4;

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column({ type: 'varchar' })
  hash: string;

  @Column({ type: 'varchar', nullable: true })
  email?: string;

  @Column({ type: 'varchar', nullable: true })
  hashedRt?: string;

  @Column({ type: 'varchar', default: 'user' })
  role?: string;

  @OneToMany(() => Columns, (column) => column.user)
  columns: Columns[];

  @OneToMany(() => Cards, (card) => card.user)
  cards: Cards[];

  @OneToMany(() => Comments, (comment) => comment.user)
  comments: Comments[];
}
