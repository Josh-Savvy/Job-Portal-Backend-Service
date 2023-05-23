import { Field, HideField, InputType, ObjectType } from '@nestjs/graphql';
import { AccountType } from '../enums';
import { IndustryType } from './industry.type';
import { NotificationType } from './notification.type';
import { JobType } from 'src/job/job.type';

@InputType('UserInputType')
@ObjectType()
export class UserType {
  @Field()
  id: string;
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  username?: string;
  @Field()
  adminUsername?: string;
  @Field({ nullable: true })
  profileViews: string;
  @HideField()
  password: string;
  @Field(() => AccountType, {
    defaultValue: AccountType.FREELANCER,
    nullable: true,
  })
  accountType: AccountType;
  @Field(() => IndustryType, { nullable: true })
  category?: IndustryType;
  @Field(() => [NotificationType], {
    nullable: true,
  })
  notifications?: NotificationType[];
  @Field(() => [JobType], { nullable: true })
  savedJobs?: JobType[];
  @Field(() => [JobType], { nullable: true })
  appliedJobs?: JobType[];
  @Field({ nullable: true, defaultValue: false })
  isActive?: boolean;
  @Field({ nullable: true })
  createdAt: Date;
  @Field({ nullable: true })
  updatedAt?: Date;
}
