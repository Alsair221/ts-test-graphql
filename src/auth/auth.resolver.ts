import {Resolver, Mutation, Args} from "@nestjs/graphql";
import {AuthService} from "./auth.service";
import {AuthPayload} from "./auth.type";

@Resolver()
export class AuthResolver{
    constructor(
        private readonly authService: AuthService
    ) {
    }

    @Mutation(() => AuthPayload, {
        description: 'регистрация пользователя по email'
    })
    async register(@Args('email') email: string, @Args('pass') pass: string) {
        return this.authService.register(email, pass);
    }

    @Mutation(() => AuthPayload, {
        description: 'авторизация пользователя по email'
    })
    async login(@Args('email') email: string, @Args('pass') pass: string) {
        return this.authService.login(email, pass);
    }
}