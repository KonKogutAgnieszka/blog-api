import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { PostsModule } from './features/posts/posts.module';
import { UsersModule } from './features/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    PostsModule,
    UsersModule,
  ],
})
export class AppModule {}
