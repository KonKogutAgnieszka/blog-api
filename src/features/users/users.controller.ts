import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.usersService.getUser(id);
  }
  @Post()
  async createUSer(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }
}
