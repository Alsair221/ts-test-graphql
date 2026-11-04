import  { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";

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
}