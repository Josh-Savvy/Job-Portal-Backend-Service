import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { UserType } from './user.type';
import { JobType } from 'src/job/job.type';

@InputType('IndustryInputType')
@ObjectType()
export class IndustryType {
  @Field()
  id: string;
  @Field({ nullable: true })
  title: string;
  @Field({ nullable: true })
  icon: string;
  @Field({ nullable: true })
  slug: string;
  @Field(() => [UserType], { nullable: true })
  users?: UserType[];
  @Field(() => [JobType], { nullable: true })
  jobs?: JobType[];
  @Field({ nullable: true })
  createdAt: Date;
  @Field({ nullable: true })
  updatedAt?: Date;
}
