import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { JobNatureEnum } from '../enums';
import { Industry } from 'src/user/entities/industry.entity';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column()
  position: string;
  @Column()
  company: string;
  @Column({
    type: 'enum',
    enum: JobNatureEnum,
    nullable: true,
  })
  nature: JobNatureEnum;
  @Column({ nullable: true })
  location: string;
  @Column()
  description: string;
  @Column()
  createdBy: string;
  @Column({ nullable: true })
  salary: string;
  @Column({ unique: true })
  slug: string;
  @Column({ nullable: true, default: false })
  active: boolean;
  @Column('text', { array: true })
  responsibilities: string[];
  @ManyToMany(() => User, { nullable: true })
  @JoinTable()
  usersBookmark?: User[];
  @ManyToMany(() => User, { nullable: true })
  @JoinTable()
  applicants: User[];
  @ManyToOne(() => Industry, { nullable: true })
  category: Industry;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
