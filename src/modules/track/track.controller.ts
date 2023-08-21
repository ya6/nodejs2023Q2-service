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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { uuidDto } from '../../common/dto/uuid.dto';
import { Response } from 'express';

@ApiBearerAuth()
@ApiTags('Track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    return await this.trackService.create(createTrackDto);
  }

  @Get()
  async findAll() {
    return await this.trackService.findAll();
  }

  @Get(':id')
  async findOne(
    @Res({ passthrough: true }) response: Response,
    @Param() idDto: uuidDto,
  ) {
    const { id } = idDto;
    const track = await this.trackService.findOne(id);

    if (track === null) {
      response.status(404).send();
    }
    if (track) {
      response.status(200).send(track);
    }
  }

  @Put(':id')
  async update(
    @Res({ passthrough: true }) response: Response,
    @Param() idDto: uuidDto,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const { id } = idDto;
    const track = await this.trackService.update(id, updateTrackDto);

    if (track === null) {
      response.status(404).send();
    }
    if (track) {
      response.status(200).send(track);
    }
  }

  @Delete(':id')
  async remove(@Res() response: Response, @Param() idDto: uuidDto) {
    const { id } = idDto;
    const result = await this.trackService.remove(id);
    console.log('-----track----', result);

    if (result === 0) {
      response.status(404).send();
    }
    if (result === 1) {
      response.status(204).send();
    }
  }
}
