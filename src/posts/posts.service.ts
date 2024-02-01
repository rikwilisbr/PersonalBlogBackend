import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PostsDto } from './dto/posts.dto';
import TimestampToDate from 'src/utils/convertTimeStamps';


type PostTypes = {
    title: string,
    description: string,
    markdown: string
}
@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) {}
    async getPost(id: string){
        const foundPost = await this.prisma.post.findUnique({where: {id: id}})
        if(foundPost){
            return {
                success: true,
                message: {
                    id: foundPost.id,
                    title: foundPost.title,
                    description: foundPost.description,
                    markdown: foundPost.markdown,
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

    async newPost(dto: PostsDto){
        try {
            const { title, description, markdown } = dto;
            const payload = {
                title,
                description,
                markdown
            };
            
            
            await this.prisma.post.create({
                data: payload
            });
    
            // Optionally, you may return something meaningful
            return { success: true, message: 'Post created successfully' };
        } catch (error) {
            // Handle the error appropriately (e.g., log, throw, or return an error response)
            console.error(error);
            throw new Error('Failed to create post');
        }
    }

    async editPost(dto: PostsDto){
        const {id, title, description, markdown} = dto
        const payload = {
            title,
            description,
            markdown
        }

        const foundPost = await this.prisma.post.findUnique({where: {id: id}})

        if(!foundPost){
            return {success:false, message:'Post not found'}
        }

        const updatedPost = await this.prisma.post.update({where: {id: id},data: payload})
        return {
            success: true,
            message: {
                id: updatedPost.id,
                title: updatedPost.title,
                description: updatedPost.description,
                markdown: updatedPost.markdown,
                date: TimestampToDate(updatedPost.CreaedAt)
            }
        }
    }

    async deletePost(id: string){
        const foundPost = await this.prisma.post.findUnique({where: {id: id}})
        if(foundPost){
            await this.prisma.post.delete({where: {id: id}})
            return {
                success: true,
                message: 'Post deleted'
            }
        } else {
            return {
                success: false,
                message: 'Post not found'
            }
         }
    }
}
