import { Module } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { ProfileController } from "./profile.controller";
import {ProfileResolver} from "./profile.resolver";

@Module({
    controllers: [ProfileController],
    providers: [ProfileService, ProfileResolver],
    exports: [ProfileService],
})
export class ProfileModule {}
