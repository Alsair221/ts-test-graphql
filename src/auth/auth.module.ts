import {Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {AuthService} from "./auth.service";
import {AuthResolver} from "./auth.resolver";
import {JwtAuthGuard} from "./jwt-auth.guard";

const secret = process.env.JWT_SECRET;
@Module({
    imports: [
        JwtModule.register({secret, signOptions: {expiresIn: '1d'}}),
    ],
    controllers: [],
    providers: [AuthService, AuthResolver, JwtAuthGuard],
    exports: [AuthService, JwtAuthGuard]
})
export class AuthModule {}