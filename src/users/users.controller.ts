import { Body, Controller, ParseIntPipe, UseGuards } from '@nestjs/common';
import { Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser } from './dto/user-create.dto';
import { UpdateUser } from './dto/user-update.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  //dependency injection
  constructor(private userService: UsersService) {}
  //get request
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getUsers() {
    return this.userService.get();
  }

  @Post()
  store(@Body() body: CreateUser) {
    console.log(body);

    return this.userService.create(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/:userId')
  update(
    @Body() body: UpdateUser,
    @Param('userId', ParseIntPipe) userId: string,
  ) {
    console.log(body);

    return this.userService.update(body, userId);
  }

  //get user by id
  @UseGuards(AuthGuard('jwt'))
  @Get('/:userId')
  getUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.getById(userId);
  }

  //delete user by id
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:userId')
  deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.delete(userId);
  }
}
