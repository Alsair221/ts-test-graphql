import { Module } from '@nestjs/common';

import { ProfileModule } from './profile/profile.module';
import {PrismaModule} from "./prisma/prisma.module";
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";

@Module({
  imports: [
      GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        autoSchemaFile: true,
      }),
      ProfileModule,
      PrismaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
