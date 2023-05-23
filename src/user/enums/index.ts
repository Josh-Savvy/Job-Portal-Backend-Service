import { registerEnumType } from '@nestjs/graphql';

export enum AccountType {
  FREELANCER = 'Freelancer',
  EMPLOYER = 'Employer',
  ADMIN = 'Admin',
}
export enum RegAccountType {
  FREELANCER = 'Freelancer',
  EMPLOYER = 'Employer',
}

registerEnumType(AccountType, { name: 'AccountType' });
registerEnumType(RegAccountType, { name: 'RegAccountType' });
