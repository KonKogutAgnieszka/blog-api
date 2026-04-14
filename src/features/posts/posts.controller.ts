import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getPosts() {
    return await this.postsService.getAllPosts();
  }
  @Get(':id')
  async getPost(@Param('id') id: string) {
    return await this.postsService.getPost(id);
  }

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto) {
    return await this.postsService.createPost(createPostDto);
  }
}
