import  { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {ProfileInput} from "./dto/profile.inputs";

@Injectable()
export class ProfileService {
    constructor(
        private readonly prisma: PrismaService
    ) {
    }

    async getProfiles() {
        return this.prisma.profile.findMany({
            include: {
                skills: {include: {skill: true, skillLevel: true}},
                experience: {include: {company: true, position: true}},
                projects: {include: {project: true}}
            }
        });
    }

    async getProfile(slug: string) {
        return this.prisma.profile.findUnique({
            where: { slug },
            include: {
                skills: { include: { skill: true, skillLevel: true } },
                experience: { include: { company: true, position: true } },
                projects: { include: { project: true } }
            }
        })
    }

    async getProfileByUser(userId: number) {
        return this.prisma.profile.findUnique({
            where: { userId }
        })
    }

    async createProfile(input: ProfileInput, userId: number){
        const data = {
            name: input.name,
            slug: input.slug,
            userId,
            description: input.description,
            github: input.github,
            linkedin: input.linkedin,
        };
        return this.prisma.profile.create({ data });
    }
}