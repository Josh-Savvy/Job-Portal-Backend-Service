import { Field, InputType } from '@nestjs/graphql';
import { AccountType } from 'src/user/enums';
import { JobNatureEnum } from '../enums';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

@InputType()
export class JobCreateInput {
  @Field()
  @IsString({ message: 'Title is required' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;
  @Field()
  @IsString({ message: 'Description is required' })
  @IsNotEmpty({ message: 'Description is required' })
  description: string;
  @Field()
  @IsString({ message: 'Position is required' })
  @IsNotEmpty({ message: 'Position is required' })
  position: string;
  @Field()
  @IsString({ message: 'Location is required' })
  @IsNotEmpty({ message: 'Location is required' })
  location: string;
  @Field()
  @IsString({ message: 'Company name is required' })
  @IsNotEmpty({ message: 'Company name is required' })
  company: string;
  @Field(() => JobNatureEnum)
  @IsNotEmpty({ message: 'Job Nature is required' })
  nature: JobNatureEnum;
  @Field()
  @IsString({ message: 'Salary is required' })
  @IsNotEmpty({ message: 'Salary is required' })
  salary: string;
  @Field()
  @IsString({ message: 'Experience level is required' })
  @IsNotEmpty({ message: 'Experience level is required' })
  experience: string;
  @Field()
  @IsString({ message: 'Education field is required' })
  @IsNotEmpty({ message: 'Education field is required' })
  education: string;
  @Field({ nullable: true })
  @IsOptional()
  @IsUrl(
    { allow_query_components: true },
    { message: 'External Link must be a valid URL' },
  )
  externalLink: string;
  @Field({ nullable: true })
  @IsNotEmpty({ message: 'Expiry Date is required' })
  @IsDate({ message: 'Invalid Date format for expiry date' })
  expiryDate: Date;
  @Field(() => [String], { nullable: true })
  @IsArray({ message: 'Responsibilities field must be an array' })
  @IsNotEmpty({ message: 'Responsibilities field is required' })
  responsibilities?: string[];
  @Field(() => [String], { nullable: true })
  @IsArray({ message: 'Tags must be an array' })
  @IsNotEmpty({ message: 'Tags field is required' })
  tags?: string[];
  @Field({ nullable: true })
  @IsString({ message: 'CategoryID is required' })
  @IsNotEmpty({ message: 'CategoryID is required' })
  categoryId: string;
}
