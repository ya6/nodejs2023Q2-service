import { Controller, Get, Post, Param, Delete, Res } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { uuidDto } from 'src/common/dto/uuid.dto';

@ApiTags('Favotites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }
  // track
  @Post('track/:id')
  createFavTrack(@Res() response: Response, @Param() idDto: uuidDto) {
    const { id } = idDto;
    const result = this.favoritesService.createFavTrack(id);

    if (result === undefined) {
      response.status(422).send();
    }
    if (result) {
      response.status(201).send();
    }
  }

  @Delete('track/:id')
  removeFavTrack(@Res() response: Response, @Param() idDto: uuidDto) {
    const { id } = idDto;

    const result = this.favoritesService.removeFavTrack(id);

    if (result === undefined) {
      response.status(404).send();
    }
    if (result === null) {
      response.status(204).send();
    }
  }
  // artist
  @Post('artist/:id')
  createFavArtist(@Res() response: Response, @Param() idDto: uuidDto) {
    const { id } = idDto;

    const result = this.favoritesService.createFavArtist(id);

    if (result === undefined) {
      response.status(422).send();
    }
    if (result) {
      response.status(201).send();
    }
  }

  @Delete('artist/:id')
  removeFavArtist(@Res() response: Response, @Param() idDto: uuidDto) {
    const { id } = idDto;

    const result = this.favoritesService.removeFavArtist(id);

    if (result === undefined) {
      response.status(404).send();
    }
    if (result === null) {
      response.status(204).send();
    }
  }

  // album
  @Post('album/:id')
  createFavAlbum(@Res() response: Response, @Param() idDto: uuidDto) {
    const { id } = idDto;

    const result = this.favoritesService.createFavAlbum(id);

    if (result === undefined) {
      response.status(422).send();
    }
    if (result) {
      response.status(201).send();
    }
  }

  @Delete('album/:id')
  removeFavAlbum(@Res() response: Response, @Param() idDto: uuidDto) {
    const { id } = idDto;

    const result = this.favoritesService.removeFavAlbum(id);

    if (result === undefined) {
      response.status(404).send();
    }
    if (result === null) {
      response.status(204).send();
    }
  }
}
