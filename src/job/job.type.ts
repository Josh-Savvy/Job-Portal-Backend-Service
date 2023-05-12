import { Field, Float, InputType, ObjectType } from '@nestjs/graphql';
import { UserType } from 'src/user/types/user.type';
import { JobNatureEnum } from './enums';
import { IndustryType } from 'src/user/types/industry.type';

@InputType('JobInputType')
@ObjectType()
export class JobType {
  @Field()
  id: string;
  @Field()
  title: string;
  @Field()
  position: string;
  @Field()
  description: string;
  @Field()
  slug: string;
  @Field(() => JobNatureEnum, { nullable: true })
  nature: JobNatureEnum;
  @Field({ nullable: true })
  location: string;
  @Field()
  company: string;
  @Field(() => IndustryType, { nullable: true })
  category: IndustryType;
  @Field()
  createdBy: string;
  @Field({ nullable: true })
  salary: string;
  @Field({ nullable: true, defaultValue: false })
  active: boolean;
  @Field(() => [String], { nullable: true })
  responsibilities: string[];
  @Field(() => [UserType], { nullable: true })
  usersBookmark?: UserType[];
  @Field(() => [UserType], { nullable: true })
  applicants: UserType[];
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}
