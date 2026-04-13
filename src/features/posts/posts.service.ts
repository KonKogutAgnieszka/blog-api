import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto } from './create-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllPosts() {
    return this.prisma.post.findMany();
  }

  async createPost(createPostDto: CreatePostDto) {
    return await this.prisma.post.create({
      data: createPostDto,
    });
  }
}
