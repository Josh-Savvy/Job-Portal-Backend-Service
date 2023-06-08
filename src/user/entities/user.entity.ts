import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { AccountType } from '../enums';
import { Industry } from './industry.entity';
import { Notification } from './notification.entity';
import { Job } from 'src/job/entities/job.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column({ nullable: true, unique: true })
  username?: string;
  @Column({ nullable: true, unique: true })
  adminUsername?: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column({ nullable: true })
  profileImg?: string;
  @Column({ nullable: true })
  experience?: string;
  @Column({ nullable: true })
  education?: string;
  @Column({ nullable: true })
  profileViews?: string;
  @Column({ nullable: true })
  DOB?: Date;
  @Column({ nullable: true })
  jobTitle?: string;
  @Column({ nullable: true })
  personalWebsite?: string;
  @Column({
    type: 'enum',
    enum: AccountType,
    default: AccountType.FREELANCER,
    nullable: true,
  })
  accountType: AccountType;
  @ManyToOne(() => Industry, { nullable: true })
  category?: Industry;
  @ManyToMany(() => Notification, {
    nullable: true,
  })
  @JoinTable()
  notifications?: Notification[];
  @ManyToMany(() => Job, { nullable: true })
  @JoinTable()
  savedJobs?: Job[];
  @ManyToMany(() => Job, { nullable: true })
  @JoinTable()
  appliedJobs?: Job[];
  @Column({ nullable: true, default: false })
  isActive?: boolean;
  @CreateDateColumn({ nullable: true })
  createdAt: Date;
  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;
}
