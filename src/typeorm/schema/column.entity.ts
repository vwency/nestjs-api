import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Cards } from './card.entity';
import { Comments } from './comment.entity';
import { Users } from './user.entity';

@Entity('Columns')
export class Columns {
  @PrimaryGeneratedColumn('uuid')
  column_id: string;

  @Column('uuid')
  user_id: string;

  @Column({ type: 'varchar', unique: true })
  column_name: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @OneToMany(() => Cards, (card) => card.column)
  cards: Cards[];

  @OneToMany(() => Comments, (comment) => comment.column)
  comments: Comments[];

  @ManyToOne(() => Users, (user) => user.columns, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
