import {Injectable, ConflictException, UnauthorizedException} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import * as bcrypt from 'bcrypt'
import {JwtService} from "@nestjs/jwt";
import {User} from "../generated/prisma/client";

type AuthUser = Pick<User, 'id' | 'email' | 'role'>;

@Injectable()
export class AuthService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) {
    }

    async register(email: string, pass: string) {
        const hasEmail = await this.getUserByEmail(email);

        if (hasEmail){
            throw new ConflictException(`Пользователь с "${email}" уже существует!`);
        }

        const passwordHash = await bcrypt.hash(pass, 10);
        const user = await this.prisma.user.create({
            data: {email, passwordHash}
        });

        const token = this.buildToken(user);
        return this.buildAuthPayload(token, user);
    }

    async login(email: string, pass: string) {
        const user = await this.getUserByEmail(email);

        if (!user){
            throw new UnauthorizedException(`Не верный логин или пароль!`);
        }

        const isMatch = await bcrypt.compare(pass, user.passwordHash);

        if (!isMatch){
            throw new UnauthorizedException(`Не верный логин или пароль!`);
        }

        const token = this.buildToken(user);
        return this.buildAuthPayload(token, user);
    }

    async getUserByEmail(email: string) {
        return this.prisma.user.findFirst({
            where: { email }
        });
    }

    private buildAuthPayload(token: string, user: AuthUser){
        return { token, user: { id: user.id, email: user.email, role: user.role } }
    }

    private buildToken(user: AuthUser){
        return this.jwtService.sign({sub: user.id, email: user.email, role: user.role});
    }
}