import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './create-user.dto';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });
  }

  async getUser(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async createUser(createUserDto: CreateUserDto) {
    if (createUserDto.password !== createUserDto.confirmPassword)
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
    const { password, confirmPassword: _, ...rest } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const { password: _, ...user } = await this.prisma.user.create({
        data: { ...rest, password: hashedPassword },
      });
      return user;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      )
        throw new HttpException('Email already in use', HttpStatus.CONFLICT);
      throw error;
    }
  }
}
