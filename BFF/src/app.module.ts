import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'], // 添加src下schema graphql文件
      playground: false, // false 禁用graphql 客户端页面
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'), // 所有的GraphQL SDL类型相对应的TypeScript定义（类和接口）
        outputAs: 'class',
      },
      plugins: [ApolloServerPluginLandingPageLocalDefault()], // 使用apolloV4
    }),
    CatModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
