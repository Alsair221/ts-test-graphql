import {Field, InputType} from "@nestjs/graphql";
import {IsEmail, Matches, MinLength} from "class-validator";

@InputType()
export class RegisterInput{
    @Field()
    @IsEmail()
    email: string;

    @Field()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)/, {message: 'Пароль должен содержать латинские буквы и цифры'})
    @MinLength(8)
    password: string;
}

@InputType()
export class LoginInput{
    @Field()
    @IsEmail()
    email: string;

    @Field()
    password: string;
}