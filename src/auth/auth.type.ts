import {Field, Int, ObjectType, registerEnumType} from "@nestjs/graphql";
import {UserRole} from "../generated/prisma/enums";

registerEnumType(UserRole, {
    name: 'UserRole',
    description: 'Роль пользователя'
})

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