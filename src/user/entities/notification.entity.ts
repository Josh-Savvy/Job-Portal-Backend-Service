import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './user.entity';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @ManyToMany(() => User, { nullable: true })
  @JoinTable()
  user?: User;
  @Column({ nullable: true, default: false })
  isRead?: boolean;
  @CreateDateColumn({ nullable: true })
  createdAt: Date;
  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;
}
