import {Field, Int, ObjectType, registerEnumType} from "@nestjs/graphql";
import {UserRole} from "../generated/prisma/enums";
import { Request } from 'express';

registerEnumType(UserRole, {
    name: 'UserRole',
    description: 'Роль пользователя'
})

export interface JwtPayload {
    sub: number;      // id пользователя
    email: string;
    role: UserRole;
}

export interface GraphQlContext {
    req: Request & { user: JwtPayload };
}

@ObjectType()
export class UserType {
    @Field(() => Int)
    id: number;

    @Field()
    email: string;

    @Field(() => UserRole)
    role: UserRole;
}

@ObjectType()
export class AuthPayload {
    @Field()
    token: string;

    @Field(() => UserType)
    user: UserType;
}