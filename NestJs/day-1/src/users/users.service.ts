import { Injectable } from '@nestjs/common';
import { ICreateUser, ICreateUserResponse, IUsers } from './users.interface';

@Injectable()
export class UsersService {
  private users: IUsers[] = [];

  getUsers(): any {
    return {
      message: 'Users fetched successfully',
      data: this.users,
    };
  }

  getUserById(id: string): any {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return {
        message: 'User not found',
        data: null,
      };
    }
    return {
      message: 'User fetched successfully',
      data: user,
    };
  }

  createUser(body: ICreateUser): ICreateUserResponse {
    const newUser = { ...body, id: Date.now().toString() };
    this.users.push(newUser);
    return {
      message: 'User created successfully',
      data: newUser,
    };
  }

  updateUser(
    id: string,
    body: ICreateUser,
  ): ICreateUserResponse | { message: string; data: null } {
    const index = this.findUserIndex(id);
    if (index === -1) {
      return {
        message: 'User not found',
        data: null,
      };
    }
    console.log('data', body);

    this.users[index] = { ...this.users[index], ...body };
    return {
      message: 'User updated successfully',
      data: this.users[index],
    };
  }

  deleteUser(id: string): { message: string; data: null } {
    const index = this.findUserIndex(id);
    if (index === -1) {
      return {
        message: 'User not found',
        data: null,
      };
    }
    this.users.splice(index, 1);
    return {
      message: 'User deleted successfully',
      data: null,
    };
  }

  private findUserIndex(id: string): number {
    return this.users.findIndex((user) => user.id === id);
  }
}
