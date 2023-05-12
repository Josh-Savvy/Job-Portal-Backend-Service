import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { AccountType } from 'src/user/enums';

@Injectable()
export class AccountTypeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requireAccountType = this.reflector.getAllAndOverride<AccountType[]>(
      'accountType',
      [context.getHandler(), context.getClass()],
    );
    if (!requireAccountType) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext().req;
    return requireAccountType.some((accountType) =>
      user.accountType.includes(accountType),
    );
  }
}
