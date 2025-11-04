import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { ICreateUser, ICreateUserResponse } from './users.interface';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/')
  getUsers(): any {
    return this.userService.getUsers();
  }

  @Get('/:id')
  getUserById(@Param('id') id: string): any {
    return this.userService.getUserById(id);
  }

  @Post('/')
  createUser(@Body() body: ICreateUser): ICreateUserResponse {
    this.validateRequiredFields(body);
    return this.userService.createUser(body);
  }

  @Put('/:id')
  updateUser(
    @Param('id') id: string,
    @Body() body: ICreateUser,
  ): ICreateUserResponse | { message: string; data: null } {
    console.log('data', body);
    this.validateRequiredFields(body);
    const updatedUser = this.userService.updateUser(id, body);
    if (!updatedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return updatedUser;
  }

  private validateRequiredFields(body: ICreateUser): void {
    if (!body) {
      throw new HttpException(
        'Missing required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string): { message: string; data: null } {
    return this.userService.deleteUser(id);
  }
}
