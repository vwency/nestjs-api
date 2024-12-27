import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Users } from './user.entity';
import { Columns } from './column.entity';
import { Cards } from './card.entity';

@Entity('Comments')
export class Comments {
  @PrimaryGeneratedColumn('uuid')
  comment_id: string;

  @Column('uuid')
  user_id: string;

  @Column('uuid')
  column_id: string;

  @Column('uuid')
  card_id: string;

  @Column({ type: 'varchar', unique: true })
  comment_name: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @ManyToOne(() => Users, (user) => user.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(() => Columns, (column) => column.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'column_id' })
  column: Columns;

  @ManyToOne(() => Cards, (card) => card.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'card_id' })
  card: Cards;
}
