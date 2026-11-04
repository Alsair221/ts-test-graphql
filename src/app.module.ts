import {HttpStatus, Module} from '@nestjs/common';

import { ProfileModule } from './profile/profile.module';
import {PrismaModule} from "./prisma/prisma.module";
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";

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
                  code: ext?.status
                      ? HttpStatus[ext.status]
                      : ext?.code ?? 'INTERNAL_SERVER_ERROR',
              },
            };
        },
      }),
      ProfileModule,
      PrismaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
