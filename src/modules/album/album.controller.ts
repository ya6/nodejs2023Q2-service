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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { uuidDto } from 'src/common/dto/uuid.dto';

@ApiBearerAuth()
@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumService.create(createAlbumDto);
  }

  @Get()
  async findAll() {
    return await this.albumService.findAll();
  }

  @Get(':id')
  async findOne(
    @Res({ passthrough: true }) response: Response,
    @Param() idDto: uuidDto,
  ) {
    const { id } = idDto;
    const album = await this.albumService.findOne(id);

    if (album === null) {
      response.status(404).send();
    }
    if (album) {
      response.status(200).send(album);
    }
  }

  @Put(':id')
  async update(
    @Res({ passthrough: true }) response: Response,
    @Param() idDto: uuidDto,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const { id } = idDto;
    const album = await this.albumService.update(id, updateAlbumDto);
    if (album === null) {
      response.status(404).send();
    }
    if (album) {
      response.status(200).send(album);
    }
  }

  @Delete(':id')
  async remove(@Res() response: Response, @Param() idDto: uuidDto) {
    const { id } = idDto;
    const result = await this.albumService.remove(id);
    if (result === 0) {
      response.status(404).send();
    }
    if (result === 1) {
      response.status(204).send();
    }
  }
}
