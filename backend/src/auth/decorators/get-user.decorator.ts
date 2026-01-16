import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;

        // If no property requested, return full user
        if (!data) {
            return user;
        }

        // If property requested (e.g. 'id'), return that field
        return user?.[data];
    },
);
