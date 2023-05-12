import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
} from 'typeorm';
import { User } from './user.entity';
import { Job } from 'src/job/entities/job.entity';

@Entity('industries')
export class Industry {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column({ nullable: true })
  icon: string;
  @Column({ unique: true, nullable: true })
  slug: string;
  @OneToMany(() => User, (user) => user.category)
  @JoinTable()
  users?: User[];
  @OneToMany(() => Job, (user) => user.category)
  @JoinTable()
  jobs?: Job[];
  @CreateDateColumn({ nullable: true })
  createdAt: Date;
  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;
}
