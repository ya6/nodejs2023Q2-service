import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  Put,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { uuidDto } from '../../common/dto/uuid.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(
    @Res({ passthrough: true }) response: Response,
    @Param() idDto: uuidDto,
  ) {
    const { id } = idDto;
    const user = await this.userService.findOne(id);

    if (user === null) {
      response.status(404).send();
    }
    if (user) {
      response.status(200).send(user);
    }
  }

  @Put(':id')
  async update(
    @Res({ passthrough: true }) response: Response,
    @Param() idDto: uuidDto,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const { id } = idDto;
    const user = await this.userService.update(id, updatePasswordDto);

    if (user === null) {
      response.status(404).send();
    }
    if (user === false) {
      response.status(403).send();
    }
    if (user) {
      response.status(200).send(user);
    }
  }

  @Delete(':id')
  async remove(@Res() response: Response, @Param() idDto: uuidDto) {
    const { id } = idDto;
    const result = await this.userService.remove(id);

    if (result === 0) {
      response.status(404).send();
    }
    if (result === 1) {
      response.status(204).send();
    }
  }
}
