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

    async newPost(dto: PostsDto){
        try {
            const { title, description, markdown, tags } = dto;
            const formatTags = tags.replace(/\s/g, '')
            const tagsArray = formatTags.split(',')
            const payload = {
                title,
                description,
                markdown,
                tags: tagsArray
            };
            
            await this.prisma.post.create({
                data: payload
            });

            //sending newsletter
            const emailArray = await this.prisma.newsletter.findMany()
            await SendEmails(emailArray, dto)
            return { success: true, message: 'Post created successfully' };
        } catch (error) {
            console.error(error);
            throw new Error('Failed to create post');
        }
    }

    async editPost(dto: PostsDto, titleParam: string){
        const {title, description, markdown, tags} = dto
        const formatTags = tags.replace(/\s/g, '')
        const tagsArray = formatTags.split(',')
        const payload = {
            title,
            description,
            markdown,
            tags: tagsArray
        }

        const foundPost = await this.prisma.post.findFirst({where: {title: titleParam}})
        
        if(!foundPost){
            return {success:false, message:'Post not found'}
        }
        const id = foundPost.id
        const updatedPost = await this.prisma.post.update({where: {id: id},data: payload})
        return {
            success: true,
            message: {
                id: updatedPost.id,
                title: updatedPost.title,
                description: updatedPost.description,
                markdown: updatedPost.markdown,
                tags: updatedPost.tags,
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
