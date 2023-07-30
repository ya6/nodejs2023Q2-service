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
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { uuidDto } from 'src/common/dto/uuid.dto';

@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(
    @Res({ passthrough: true }) response: Response,
    @Param() idDto: uuidDto,
  ) {
    const { id } = idDto;
    const album = this.albumService.findOne(id);

    if (album === undefined) {
      response.status(404).send();
    }
    if (album) {
      response.status(200).send(album);
    }
  }

  @Put(':id')
  update(
    @Res({ passthrough: true }) response: Response,
    @Param() idDto: uuidDto,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const { id } = idDto;
    const artist = this.albumService.update(id, updateAlbumDto);

    if (artist === undefined) {
      response.status(404).send();
    }
    if (artist) {
      response.status(200).send(artist);
    }
  }

  @Delete(':id')
  remove(@Res() response: Response, @Param() idDto: uuidDto) {
    const { id } = idDto;
    const result = this.albumService.remove(id);
    if (result === undefined) {
      response.status(404).send();
    }
    if (result === null) {
      response.status(204).send();
    }
  }
}
