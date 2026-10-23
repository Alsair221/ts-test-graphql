import {Query, Resolver} from "@nestjs/graphql";
import {ProfileType} from "./profile.type";
import {ProfileService} from "./profile.service";

@Resolver(() => ProfileType)
export class ProfileResolver {
    constructor(private readonly profileService: ProfileService) {
    }

    @Query(() => ProfileType, { nullable: true })
    async profile() {
        return this.profileService.getProfile();
    }
}