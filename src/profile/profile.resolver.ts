import {Parent, Query, ResolveField, Resolver} from "@nestjs/graphql";
import {ProfileSkillType, ProfileType, ProjectType} from "./profile.type";
import {ProfileService} from "./profile.service";

@Resolver(() => ProfileType)
export class ProfileResolver {
    constructor(private readonly profileService: ProfileService) {
    }

    @Query(() => ProfileType)
    async profile() {
        return this.profileService.getProfile();
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