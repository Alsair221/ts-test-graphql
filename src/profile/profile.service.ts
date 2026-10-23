import  { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class ProfileService {
    constructor(
        private readonly prisma: PrismaService
    ) {
    }
    async getProfile() {
        return this.prisma.profile.findUnique({
            where: { slug: 'alexandr_semenov' },
            include: {
                skills: { include: { skill: true, skillLevel: true } },
                experience: { include: { company: true, position: true } },
                projects: { include: { project: true } }
            }
        })
    }
}