import { SetMetadata } from '@nestjs/common';
import { AccountType } from '../../user/enums';

export const ACCOUNT_TYPE_KEY = 'accountType';
export const AccountTypeDecorator = (...accountType: AccountType[]) =>
  SetMetadata(ACCOUNT_TYPE_KEY, accountType);
