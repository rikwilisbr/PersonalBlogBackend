import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PostsDto } from './dto/posts.dto';
import TimestampToDate from 'src/utils/convertTimeStamps';
import SendEmails from 'src/utils/sendEmails';

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) {}
    async getPost(title: string){
        const foundPost = await this.prisma.post.findFirst({where:{title: title}})
        if(foundPost){
            return {
                success: true,
                message: {
                    id: foundPost.id,
                    title: foundPost.title,
                    description: foundPost.description,
                    markdown: foundPost.markdown,
                    tags: foundPost.tags,
                    date: TimestampToDate(foundPost.CreaedAt)
                }
            }
        } else {
            return {
                success: false,
                message: 'Post not found'
            }
         }
        
    }

    async getPosts(){
        const foundPosts = await this.prisma.post.findMany()
        const arrayOfPosts = []
        foundPosts.forEach((element)=>{
            const post = {
                id: element.id,
                title: element.title,
                description: element.description,
                markdown: element.markdown,
                tags: element.tags,
                date: TimestampToDate(element.CreaedAt) 
            }
            arrayOfPosts.push(post)
            return
        })

        if(foundPosts){
            return {
                success: true,
                message: arrayOfPosts
            }
        } else {
            return {
                success: false,
                message: 'Posts not found'
            }
         }
        
    }

    async getPostByTag(tag: string){
        const foundPosts = await this.prisma.post.findMany({
            where:{ 
                tags:{ 
                    has: tag 
                }
            }
        })
        if(foundPosts){
            return {
                success: true,
                message: foundPosts
            }
        } else {
            return {
                success: false,
                message: 'No posts found'
            }
         }
        
    }
}
