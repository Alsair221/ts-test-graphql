import {Args, Mutation, Parent, Query, ResolveField, Resolver} from "@nestjs/graphql";
import {ProfileSkillType, ProfileType, ProjectType} from "./profile.type";
import {ProfileService} from "./profile.service";
import {NotFoundException} from "@nestjs/common";

@Resolver(() => ProfileType)
export class ProfileResolver {
    constructor(
        private readonly profileService: ProfileService
    ) {
    }

    @Query(() => [ProfileType], {
        description: 'Список всех профилей'
    })
    async profiles() {
        return this.profileService.getProfiles();
    }

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