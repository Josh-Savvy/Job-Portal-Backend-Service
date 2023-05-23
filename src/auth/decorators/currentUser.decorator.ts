import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    if (ctx.getType() === 'http') {
      return context.switchToHttp().getRequest().user;
    } else {
      return ctx.getContext().req.user;
    }
  },
);
