import { registerEnumType } from '@nestjs/graphql';

export enum AccountType {
  FREELANCER = 'Freelancer',
  EMPLOYER = 'Employer',
  ADMIN = 'Admin',
}

registerEnumType(AccountType, { name: 'AccountType' });
