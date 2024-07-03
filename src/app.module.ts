import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PostsModule } from './posts/posts.module';
import { NewsletterModule } from './newsletter/newsletter.module';

@Module({
  imports: [PrismaModule, PostsModule, NewsletterModule],
})
export class AppModule {}
