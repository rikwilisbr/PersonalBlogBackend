import { Injectable } from '@nestjs/common';
import { NewsletterDto } from './dto/newsletter.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class NewsletterService {
    constructor(private prisma: PrismaService) {}
    async subscribe(dto: NewsletterDto){
        const { email } = dto
        const findEmail = await this.prisma.newsletter.findFirst({where:{ email: email }})
        if(!findEmail){
            await this.prisma.newsletter.create({
                data: {
                    email
                }
            })
            return {
                success: true,
                message: 'Email successfully subscribed on newsletter'
            }
        } else {
            return {
                success: false,
                message: 'Email already subscribed on newsletter '
            }
        }

    }

    async unsubscribe(email: string){
        const findEmail = await this.prisma.newsletter.findFirst({where:{ email: email }})
        if(findEmail){
            await this.prisma.newsletter.delete({where:{ email: email }})
            return {
                success: true,
                message: 'Email successfully deleted from newsletter'
            }
        } else {
            return {
                success: false,
                message: 'Email not found'
            }
        }
    }
}
