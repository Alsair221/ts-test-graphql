import {Resolver, Mutation, Args} from "@nestjs/graphql";
import {AuthService} from "./auth.service";
import {AuthPayload} from "./auth.type";
import {LoginInput, RegisterInput} from "./dto/auth.inputs";
import {Public} from "./public.decorator";

@Resolver()
export class AuthResolver{
    constructor(
        private readonly authService: AuthService
    ) {
    }

    @Public()
    @Mutation(() => AuthPayload, {
        description: 'регистрация пользователя по email'
    })
    async register(@Args('input') input: RegisterInput) {
        return this.authService.register(input.email, input.password);
    }

    @Public()
    @Mutation(() => AuthPayload, {
        description: 'авторизация пользователя по email'
    })
    async login(@Args('input') input: LoginInput) {
        return this.authService.login(input.email, input.password);
    }
}