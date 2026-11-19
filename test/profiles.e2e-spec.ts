import 'dotenv/config';
import request from "supertest";
import {INestApplication} from "@nestjs/common";
import {App} from "supertest/types";
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../src/app.module";
import {randomInt} from "node:crypto";
import {isObject, isString} from "class-validator";

describe(
    'ProfileController (e2e)',
    () => {
        let app: INestApplication<App>;

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({
                imports: [AppModule],
            }).compile();

            app = moduleFixture.createNestApplication();
            await app.init();
        });

        afterAll(async () => {
            await app.close();
        });

        const gql = (query: string, token?: string) => {
            const req = request(app.getHttpServer()).post('/graphql').send({ query });
            return token ? req.set('Authorization', `Bearer ${token}`) : req;
        };

        it('profiles (GET)', async () => {
            const res = await gql('{ profiles { id, slug } }');

            expect(res.status).toBe(200);
            expect(res.body.errors).toBeUndefined();
            expect(Array.isArray(res.body.data.profiles)).toBe(true);

            const cnt = res.body.data.profiles.length;
            const v = randomInt(0, cnt);
            const resDetail = await gql(`{ profile(slug: "${res.body.data.profiles[v].slug}") { id, name, slug, description, github, linkedin } }`);

            expect(resDetail.status).toBe(200);
            expect(resDetail.body.errors).toBeUndefined();
            expect(isObject(resDetail.body.data.profile)).toBe(true);
        });

        it('profiles no token (POST)', async () => {
            const res = await gql(`mutation{ editProfile(input: {name: "1234", slug: "1gfjdjdgdfgj"}){id, name} }`);

            expect(res.status).toBe(200);
            expect(res.body.data).toBeNull();
            expect(Array.isArray(res.body.errors)).toBe(true);
            expect(res.body.errors).toHaveLength(1);
            expect(res.body.errors[0].extensions.code).toBe('UNAUTHENTICATED');
        });


        it('profiles illegal token (POST)', async () => {
            const res = await gql(`mutation{ editProfile(input: {name: "1234", slug: "1gfjdjdgdfgj"}){id, name} }`, 'jkdfhgkjshdfjktghsuiroedhtgureses645');

            expect(res.status).toBe(200);
            expect(res.body.data).toBeNull();
            expect(Array.isArray(res.body.errors)).toBe(true);
            expect(res.body.errors).toHaveLength(1);
            expect(res.body.errors[0].extensions.code).toBe('UNAUTHENTICATED');
        });

        it('profiles mutation success (POST)', async () => {
            const res = await gql('mutation{\n' +
                        `  login(input: {email: "user@user.user", password: "user"}){` +
                        '    token\n' +
                        '  }\n' +
                        '}');
            expect(res.status).toBe(200);
            expect(res.body.errors).toBeUndefined();
            expect(isString(res.body.data.login.token)).toBe(true);

            const date = Date.now();

            const resEdit = await gql(`mutation{ editProfile(input: {name: "${date}", slug: "1gfjdjdgdfgj"}){id, name} }`, res.body.data.login.token);

            expect(resEdit.status).toBe(200);
            expect(resEdit.body.errors).toBeUndefined();
            expect(isObject(resEdit.body.data.editProfile)).toBe(true);
            expect(resEdit.body.data.editProfile.name).toBe(date.toString());
        });
    }
);