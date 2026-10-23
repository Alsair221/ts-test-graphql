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

    @Field(() => [ProfileSkillType], { nullable: true })
    skills?: ProfileSkillType[];

    @Field(() => [ExperienceType])
    experience: ExperienceType[];

    @Field(() => [ProjectType])
    projects: ProjectType[];
}

@ObjectType()
export class SkillType {
    @Field() name: string;
    @Field() slug: string;
}

@ObjectType()
export class ProfileSkillType {
    @Field(() => SkillType) skill: SkillType;
    @Field() level: string;
}

@ObjectType()
export class CompanyType {
    @Field() name: string;
    @Field() slug: string;
}

@ObjectType()
export class PositionType {
    @Field() name: string;
    @Field() slug: string;
}

@ObjectType()
export class ExperienceType {
    @Field() dateStart: Date;
    @Field({ nullable: true }) dateEnd?: Date;
    @Field() achievements: string;
    @Field(() => CompanyType) company: CompanyType;
    @Field(() => PositionType) position: PositionType;
}

@ObjectType()
export class ProjectType {
    @Field() name: string;
    @Field() slug: string;
    @Field({ nullable: true }) link?: string;
}