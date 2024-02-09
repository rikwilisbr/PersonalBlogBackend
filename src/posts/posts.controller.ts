import { Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { PostsDto } from './dto/posts.dto';
import { AuthGuard } from 'src/auth/auth.guard';

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

  @UseGuards(AuthGuard)
  @Post('new')
  newPost(@Body() dto: PostsDto){
    return this.postsService.newPost(dto)
  }

  @UseGuards(AuthGuard)
  @Put('edit/:title')
  editPost(@Body() dto: PostsDto, @Param('title') title:string ){
    return this.postsService.editPost(dto, title)
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  deletePost(@Param('id') id: string){
    return this.postsService.deletePost(id)
  }
}
