import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { PostsModule } from './posts/posts.module';
import { NewsletterModule } from './newsletter/newsletter.module';

@Module({
  imports: [AuthModule, PrismaModule, PostsModule, NewsletterModule],
})
export class AppModule {}
