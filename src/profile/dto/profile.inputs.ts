import {Field, InputType} from "@nestjs/graphql";
import {IsOptional, IsUrl, Matches, MinLength} from "class-validator";

@InputType()
export class ProfileInput{
    @Field()
    @MinLength(2)
    name: string;

    @Field()
    @Matches(/^[a-z0-9-]+$/)
    @MinLength(2)
    slug: string;

    @Field({nullable: true})
    @IsOptional()
    description: string;

    @Field({nullable: true})
    @IsOptional()
    @IsUrl()
    github: string;

    @Field({nullable: true})
    @IsOptional()
    @IsUrl()
    linkedin: string;
}