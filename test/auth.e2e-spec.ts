import 'dotenv/config';
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../src/app.module";
import {INestApplication} from "@nestjs/common";
import {App} from "supertest/types";
import request from "supertest";
import {isString} from "class-validator";

describe(
    'AuthController (e2e)',
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

        it('login: no pass (POST)', async () => {
            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({ query: 'mutation{\n' +
                        '  login(input: {email: "user@user.user"}){\n' +
                        '    token\n' +
                        '  }\n' +
                        '}' });

            expect(res.status).toBe(400);
            expect(res.body.data).toBeUndefined();
            expect(Array.isArray(res.body.errors)).toBe(true);
        });

        it('login: no input (POST)', async () => {
            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({ query: 'mutation{\n' +
                        '  login(){\n' +
                        '  }\n' +
                        '}' });

            expect(res.status).toBe(400);
            expect(res.body.data).toBeUndefined();
            expect(Array.isArray(res.body.errors)).toBe(true);
        });

        it('login: another pass (POST)', async () => {
            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({ query: 'mutation{\n' +
                        '  login(input: {email: "user@user.user", password: "user231"}){\n' +
                        '    token\n' +
                        '  }\n' +
                        '}' });

            expect(res.status).toBe(200);
            expect(res.body.data).toBeNull();
            expect(Array.isArray(res.body.errors)).toBe(true);
            expect(res.body.errors).toHaveLength(1);
            expect(res.body.errors[0].extensions.code).toBe('UNAUTHENTICATED');
        });

        it('login: no user (POST)', async () => {
            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({ query: 'mutation{\n' +
                        '  login(input: {email: "user1@user.user", password: "user"}){\n' +
                        '    token\n' +
                        '  }\n' +
                        '}' });

            expect(res.status).toBe(200);
            expect(res.body.data).toBeNull();
            expect(Array.isArray(res.body.errors)).toBe(true);
            expect(res.body.errors).toHaveLength(1);
            expect(res.body.errors[0].extensions.code).toBe('UNAUTHENTICATED');
        });

        it('login: success (POST)', async () => {
            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({ query: 'mutation{\n' +
                        '  login(input: {email: "user@user.user", password: "user"}){\n' +
                        '    token\n' +
                        '  }\n' +
                        '}' });

            expect(res.status).toBe(200);
            expect(res.body.errors).toBeUndefined();
            expect(isString(res.body.data.login.token)).toBe(true);
        });

        //--------------------------------------

        it('register: no pass (POST)', async () => {
            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({ query: 'mutation{\n' +
                        '  register(input: {email: "user@user.user"}){\n' +
                        '    token\n' +
                        '  }\n' +
                        '}' });

            expect(res.status).toBe(400);
            expect(res.body.data).toBeUndefined();
            expect(Array.isArray(res.body.errors)).toBe(true);
        });

        it('register: illegal pass (POST)', async () => {
            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({ query: 'mutation{\n' +
                        '  register(input: {email: "user@user.user", password: "1234"}){\n' +
                        '    token\n' +
                        '  }\n' +
                        '}' });

            expect(res.status).toBe(200);
            expect(res.body.data).toBeNull();
            expect(Array.isArray(res.body.errors)).toBe(true);
            expect(res.body.errors).toHaveLength(1);
            expect(res.body.errors[0].extensions.code).toBe('INTERNAL_SERVER_ERROR');
        });

        it('register: illegal email (POST)', async () => {
            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({ query: 'mutation{\n' +
                        '  register(input: {email: "user", password: "1234sdgdfh"}){\n' +
                        '    token\n' +
                        '  }\n' +
                        '}' });

            expect(res.status).toBe(200);
            expect(res.body.data).toBeNull();
            expect(Array.isArray(res.body.errors)).toBe(true);
            expect(res.body.errors).toHaveLength(1);
            expect(res.body.errors[0].extensions.code).toBe('INTERNAL_SERVER_ERROR');
        });

        it('register: illegal email and pass (POST)', async () => {
            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({ query: 'mutation{\n' +
                        '  register(input: {email: "user", password: "sdg"}){\n' +
                        '    token\n' +
                        '  }\n' +
                        '}' });

            expect(res.status).toBe(200);
            expect(res.body.data).toBeNull();
            expect(Array.isArray(res.body.errors)).toBe(true);
            expect(res.body.errors).toHaveLength(1);
            expect(res.body.errors[0].extensions.code).toBe('INTERNAL_SERVER_ERROR');
        });

        it('register: has user (POST)', async () => {
            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({ query: 'mutation{\n' +
                        '  register(input: {email: "user@user.user", password: "user"}){\n' +
                        '    token\n' +
                        '  }\n' +
                        '}' });

            expect(res.status).toBe(200);
            expect(res.body.data).toBeNull();
            expect(Array.isArray(res.body.errors)).toBe(true);
            expect(res.body.errors).toHaveLength(1);
            expect(res.body.errors[0].extensions.code).toBe('INTERNAL_SERVER_ERROR');
        });

        it('register: register new user (POST)', async () => {
            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({ query: 'mutation{\n' +
                        `  register(input: {email: "user${Date.now()}@user.user", password: "user1234"}){` +
                        '    token\n' +
                        '  }\n' +
                        '}' });

            expect(res.status).toBe(200);
            expect(res.body.errors).toBeUndefined();
            expect(isString(res.body.data.register.token)).toBe(true);
        });
    }
);