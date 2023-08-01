import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  Put,
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
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(
    @Res({ passthrough: true }) response: Response,
    @Param() idDto: uuidDto,
  ) {
    const { id } = idDto;
    const user = this.userService.findOne(id);

    if (user === undefined) {
      response.status(404).send();
    }
    if (user) {
      response.status(200).send(user);
    }
  }

  @Put(':id')
  update(
    @Res({ passthrough: true }) response: Response,
    @Param() idDto: uuidDto,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const { id } = idDto;
    const user = this.userService.update(id, updatePasswordDto);

    if (user === undefined) {
      response.status(404).send();
    }
    if (user === null) {
      response.status(403).send();
    }
    if (user) {
      response.status(200).send(user);
    }
  }

  @Delete(':id')
  remove(@Res() response: Response, @Param() idDto: uuidDto) {
    const { id } = idDto;
    const result = this.userService.remove(id);
    if (result === undefined) {
      response.status(404).send();
    }
    if (result === null) {
      response.status(204).send();
    }
  }
}
