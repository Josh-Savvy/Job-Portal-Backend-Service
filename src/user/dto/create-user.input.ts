import { Field, InputType } from '@nestjs/graphql';
import { RegAccountType } from '../enums';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsUUID,
  Length,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
  @Field()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;
  @Field()
  @IsNotEmpty({ message: 'Password is required' })
  @Length(6, 100, { message: 'Password must not be less than 6 digits' })
  // @IsStrongPassword(
  //   { minLength: 6 },
  //   { message: 'Password is not strong enough' },
  // )
  password: string;
  @Field(() => RegAccountType, {
    defaultValue: RegAccountType.FREELANCER,
  })
  @IsNotEmpty({ message: 'Select an account type' })
  accountType?: RegAccountType;
  @Field()
  @IsNotEmpty({ message: 'Please select one category' })
  @IsUUID()
  categoryId: string;
}
