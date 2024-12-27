import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Comments } from './comment.entity';
import { Columns } from './column.entity';
import { Users } from './user.entity';

@Entity('Card')
export class Cards {
  @PrimaryGeneratedColumn('uuid')
  card_id: string;

  @Column('uuid')
  user_id: string;

  @Column('uuid')
  column_id: string;

  @Column({ type: 'varchar', unique: true })
  card_name: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @OneToMany(() => Comments, (comment) => comment.card)
  comments: Comments[];

  @ManyToOne(() => Users, (user) => user.cards, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(() => Columns, (column) => column.cards, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'column_id' })
  column: Columns;
}
