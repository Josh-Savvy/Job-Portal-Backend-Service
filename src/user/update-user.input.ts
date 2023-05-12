import { Field, Int, InputType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field()
  id: string;
}
