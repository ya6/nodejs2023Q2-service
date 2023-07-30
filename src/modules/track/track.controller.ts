import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ApiTags } from '@nestjs/swagger';
import { uuidDto } from '../../common/dto/uuid.dto';
import { Response } from 'express';

@ApiTags('Track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  async findOne(
    @Res({ passthrough: true }) response: Response,
    @Param() idDto: uuidDto,
  ) {
    const { id } = idDto;
    const track = this.trackService.findOne(id);

    if (track === undefined) {
      response.status(404).send();
    }
    if (track) {
      response.status(200).send(track);
    }
  }

  @Put(':id')
  update(
    @Res({ passthrough: true }) response: Response,
    @Param() idDto: uuidDto,
    @Body() updatePasswordDto: UpdateTrackDto,
  ) {
    const { id } = idDto;
    const track = this.trackService.update(id, updatePasswordDto);

    if (track === undefined) {
      response.status(404).send();
    }
    if (track) {
      response.status(200).send(track);
    }
  }

  @Delete(':id')
  remove(@Res() response: Response, @Param() idDto: uuidDto) {
    const { id } = idDto;
    const result = this.trackService.remove(id);
    if (result === undefined) {
      response.status(404).send();
    }
    if (result === null) {
      response.status(204).send();
    }
  }
}
