import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../../types/Types';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const now = new Date().getTime();
    const newUser = this.userRepository.create({
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: now,
      updatedAt: now,
    });
    const createdUser = await this.userRepository.save(newUser);
    return this.cleanUser(createdUser);
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users.map((user: IUser) => this.cleanUser(user));
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    return this.cleanUser(user);
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.userRepository.findOne({ where: { id: id } });

    if (!user) {
      return null;
    }

    if (user.password !== updatePasswordDto.oldPassword) {
      return false;
    }
    const chagedUser = {
      ...user,
      password: updatePasswordDto.newPassword,
      version: user.version + 1,
      updatedAt: new Date().getTime(),
    };
    const updatedUser = await this.userRepository.save(chagedUser);

    return this.cleanUser(updatedUser);
  }

  async remove(id: string) {
    const { affected } = await this.userRepository.delete(id);
    return affected;
  }

  cleanUser(user: IUser) {
    if (!user) {
      return user;
    }
    const { password, createdAt, updatedAt, ...rest } = user;
    password; // del
    return {
      ...rest,
      createdAt: Number(createdAt),
      updatedAt: Number(updatedAt),
    };
  }
}
