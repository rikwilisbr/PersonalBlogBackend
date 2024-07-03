import { Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';


@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/')
  getPosts(){
    return this.postsService.getPosts()
  }

  @Get(':title')
  getPost(@Param('title') title: string){
    return this.postsService.getPost(title)
  }

  @Get('tag/:tag')
  getPostByTag(@Param('tag') tag: string){
    return this.postsService.getPostByTag(tag)
  }
}
