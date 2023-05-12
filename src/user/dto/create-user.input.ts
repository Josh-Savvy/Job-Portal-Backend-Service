import { Field, InputType } from '@nestjs/graphql';
import { AccountType } from '../enums';
import { IndustryType } from '../types/industry.type';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field(() => AccountType, {
    defaultValue: AccountType.FREELANCER,
  })
  accountType?: AccountType;
  @Field()
  categoryId: string;
}
