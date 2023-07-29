import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import db from 'src/db/db';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../../types/Types';
import { UpdatePasswordDto } from './dto/updatePassword.dto';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const now = new Date().getTime();
    const newUser = db.user.create({
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: now,
      updatedAt: now,
    });
    const createdUser = db.user.save(newUser);
    return this.cleanUser(createdUser);
  }

  findAll() {
    const users = db.user.findAll();
    return users.map((user: IUser) => this.cleanUser(user));
  }

  findOne(id: string) {
    const user = db.user.findOne(id);
    if (user === undefined) {
      return undefined;
    }
    return this.cleanUser(user);
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = db.user.findOne(id);
    if (user === undefined) {
      return undefined;
    }
    if (user.password !== updatePasswordDto.oldPassword) {
      return null;
    }
    const chagedUser = {
      ...user,
      password: updatePasswordDto.newPassword,
      version: user.version + 1,
      updatedAt: new Date().getTime(),
    };
    const updatedUser = db.user.update(chagedUser);
    return this.cleanUser(updatedUser);
  }

  remove(id: string) {
    return db.user.delete(id);
  }

  cleanUser(user: IUser) {
    const { password, ...rest } = user;
    return rest;
  }
}
