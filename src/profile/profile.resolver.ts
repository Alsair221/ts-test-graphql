import {Args, Context, Mutation, Parent, Query, ResolveField, Resolver} from "@nestjs/graphql";
import {ProfileSkillType, ProfileType, ProjectType} from "./profile.type";
import {ProfileService} from "./profile.service";
import {ConflictException, NotFoundException} from "@nestjs/common";
import {Public} from "../auth/public.decorator";
import {ProfileInput} from "./dto/profile.inputs";
import type {GraphQlContext} from "../auth/auth.type";

@Resolver(() => ProfileType)
export class ProfileResolver {
    constructor(
        private readonly profileService: ProfileService
    ) {
    }

    @Public()
    @Query(() => [ProfileType], {
        description: 'Список всех профилей'
    })
    async profiles() {
        return this.profileService.getProfiles();
    }

    @Public()
    @Query(() => ProfileType, {
        nullable: true,
        description: 'Получить один профиль по slug. Если не найден - null.'
    })
    async profile(@Args('slug') slug: string) {
        const profile = await this.profileService.getProfile(slug);
        if (!profile){
            throw new NotFoundException(`Профиль "${slug}" не найден`)
        }
        return profile;
    }

    @Mutation(() => ProfileType)
    async createProfile(@Args('input') input: ProfileInput, @Context() ctx: GraphQlContext){
        const profile = await this.profileService.getProfileByUser(ctx.req.user.sub)
        if (profile){
            throw new ConflictException(`У вас уже существует профиль!`);
        }

        return this.profileService.createProfile(input, ctx.req.user.sub);
    }

    @ResolveField(() => ProfileSkillType)
    skills(@Parent() profile: any){
        return profile.skills.map((p: any) => ({
            skill: p.skill,
            level: p.skillLevel.name
        }));
    }

    @ResolveField(() => ProjectType)
    projects(@Parent() profile: any){
        return profile.projects.map((p: any) => p.project);
    }
}