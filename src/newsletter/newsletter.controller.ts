import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { NewsletterDto } from './dto/newsletter.dto';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('subscribe')
  subscribe(@Body() dto: NewsletterDto){
    return this.newsletterService.subscribe(dto)
  }

  @Delete('unsubscribe/:email')
  unsubscribe(@Param('email') email: string){
    return this.newsletterService.unsubscribe(email)
  }
}
