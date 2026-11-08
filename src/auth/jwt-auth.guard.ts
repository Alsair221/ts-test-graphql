import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {GqlExecutionContext} from "@nestjs/graphql";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;

        const auth = req.headers['authorization'];
        if (!auth?.startsWith('Bearer ')){
            throw new UnauthorizedException('Токен не предоставлен');
        }
        const token = auth.slice(7);

        try {
            req.user = await this.jwtService.verifyAsync(token);
        } catch {
            throw new UnauthorizedException('Токен не действителен или истёк');
        }

        return true;
    }
}