import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto } from './create-post.dto';
import { UpdatePostDto } from './update-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllPosts() {
    return this.prisma.post.findMany();
  }

  async getPost(id: string) {
    return await this.prisma.post.findUnique({ where: { id } });
  }

  async createPost(createPostDto: CreatePostDto & { authorId: string }) {
    const { authorId, ...data } = createPostDto;
    return await this.prisma.post.create({
      data: {
        ...data,
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    });
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto) {
    return await this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  async deletePost(id: string) {
    return await this.prisma.post.delete({ where: { id } });
  }
}
