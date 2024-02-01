import { Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { PostsDto } from './dto/posts.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  getPosts(){
    return this.postsService.getPosts()
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getPost(@Param('id') id: string){
    return this.postsService.getPost(id)
  }

  @UseGuards(AuthGuard)
  @Post('new')
  newPost(@Body() dto: PostsDto){
    return this.postsService.newPost(dto)
  }

  @UseGuards(AuthGuard)
  @Put('edit')
  editPost(@Body() dto: PostsDto){
    return this.postsService.editPost(dto)
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  deletePost(@Param('id') id: string){
    return this.postsService.deletePost(id)
  }
}
