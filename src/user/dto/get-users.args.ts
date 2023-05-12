import { Field, ArgsType, InputType } from '@nestjs/graphql';

@InputType('GetUsersArgsInput')
@ArgsType()
class GetUsersArgs {
  @Field({ defaultValue: 10, nullable: true })
  skip?: number;

  @Field({ defaultValue: 10, nullable: true })
  limit?: number;
}

export default GetUsersArgs;
