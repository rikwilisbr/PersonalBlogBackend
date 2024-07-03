import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { PostsModule } from './posts/posts.module';
import { NewsletterModule } from './newsletter/newsletter.module';

@Module({
  imports: [PrismaModule, PostsModule, NewsletterModule],
})
export class AppModule {}
