import {Module} from '@nestjs/common';

import {AuthModule} from "./auth/auth.module";
import {ProfileModule} from './profile/profile.module';
import {PrismaModule} from "./prisma/prisma.module";
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";

@Module({
  imports: [
      GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        autoSchemaFile: true,
        formatError: (error) => {
            const ext = error.extensions as Record<string, any>;
            return {
              message: error.message,
              extensions: {
                  code: ext?.code ?? 'INTERNAL_SERVER_ERROR',
                  ...(ext?.fields ? { fields: ext.fields } : {})
              },
            };
        },
      }),
      AuthModule,
      ProfileModule,
      PrismaModule
  ],
  controllers: [],
  providers: [
      { provide: APP_GUARD, useClass: JwtAuthGuard }
  ],
})
export class AppModule {}
