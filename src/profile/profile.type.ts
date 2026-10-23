import {Field, Int, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class ProfileType {
    @Field(() => Int)
    id: number;

    @Field()
    name: string;

    @Field()
    slug: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    github?: string;

    @Field({ nullable: true })
    linkedin?: string;
}