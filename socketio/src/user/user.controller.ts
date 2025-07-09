import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('Users')
export class UserController {
  constructor(private readonly UserService: UserService) { }

  @Post()
  async create(@Body() body: { userType: string; name: string; password: string }) {
    return await this.UserService.create(body);
  }

  @Get()
  findAll() {
    return this.UserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.UserService.findOne(id); // Treat ID as string for MongoDB
  }

  @Post('/login')
  login(@Body() data: { userType: string,name: string; password: string }) {
    return this.UserService.login(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { name: string; description: string }
  ) {
    return await this.UserService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.UserService.remove(id);
  }

}
