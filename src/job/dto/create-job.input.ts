import { Field, InputType } from '@nestjs/graphql';
import { AccountType } from 'src/user/enums';
import { JobNatureEnum } from '../enums';

@InputType()
export class JobCreateInput {
  @Field()
  title: string;
  @Field()
  description: string;
  @Field()
  position: string;
  @Field()
  location: string;
  @Field()
  company: string;
  @Field(() => JobNatureEnum)
  nature: JobNatureEnum;
  @Field()
  salary: string;
  @Field(() => [String], { nullable: true })
  responsibilities?: string[];
  @Field({ nullable: true })
  categoryId: string;
}
