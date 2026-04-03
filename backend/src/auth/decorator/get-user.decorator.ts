import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<{ user?: Record<string, any> }>();
    const user = request.user;

    if (!user) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data ? user[data] : user;
  },
);
