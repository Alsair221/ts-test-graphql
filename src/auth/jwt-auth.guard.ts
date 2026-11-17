import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {GqlExecutionContext} from "@nestjs/graphql";
import {Reflector} from "@nestjs/core";
import {IS_PUBLIC_KEY} from "./public.decorator";
import {JwtPayload} from "./auth.type";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        if (isPublic) {
            return true;
        }

        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;

        const auth = req.headers['authorization'];
        if (!auth?.startsWith('Bearer ')){
            throw new UnauthorizedException('Токен не предоставлен');
        }
        const token = auth.slice(7);

        try {
            req.user = await this.jwtService.verifyAsync<JwtPayload>(token);
        } catch {
            throw new UnauthorizedException('Токен не действителен или истёк');
        }

        return true;
    }
}