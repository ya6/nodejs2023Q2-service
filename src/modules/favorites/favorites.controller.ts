import { Controller, Get, Post, Param, Delete, Res } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { uuidDto } from 'src/common/dto/uuid.dto';

@ApiBearerAuth()
@ApiTags('Favotites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async findAll() {
    return await this.favoritesService.findAll();
  }
  // track
  @Post('track/:id')
  async createFavTrack(@Res() response: Response, @Param() idDto: uuidDto) {
    const { id } = idDto;
    const result = await this.favoritesService.createFavTrack(id);

    if (result === null) {
      response.status(422).send();
    }
    if (result) {
      response.status(201).send();
    }
  }

  @Delete('track/:id')
  async removeFavTrack(@Res() response: Response, @Param() idDto: uuidDto) {
    const { id } = idDto;

    const result = await this.favoritesService.removeFavTrack(id);

    if (result === null) {
      response.status(404).send();
    }
    if (result) {
      response.status(204).send();
    }
  }
  // artist
  @Post('artist/:id')
  async createFavArtist(@Res() response: Response, @Param() idDto: uuidDto) {
    const { id } = idDto;

    const result = await this.favoritesService.createFavArtist(id);

    if (result === null) {
      response.status(422).send();
    }
    if (result) {
      response.status(201).send();
    }
  }

  @Delete('artist/:id')
  async removeFavArtist(@Res() response: Response, @Param() idDto: uuidDto) {
    const { id } = idDto;

    const result = await this.favoritesService.removeFavArtist(id);

    if (result === null) {
      response.status(404).send();
    }
    if (result) {
      response.status(204).send();
    }
  }

  // album
  @Post('album/:id')
  async createFavAlbum(@Res() response: Response, @Param() idDto: uuidDto) {
    const { id } = idDto;

    const result = await this.favoritesService.createFavAlbum(id);

    if (result === null) {
      response.status(422).send();
    }
    if (result) {
      response.status(201).send();
    }
  }

  @Delete('album/:id')
  async removeFavAlbum(@Res() response: Response, @Param() idDto: uuidDto) {
    const { id } = idDto;

    const result = await this.favoritesService.removeFavAlbum(id);

    if (result === null) {
      response.status(404).send();
    }
    if (result) {
      response.status(204).send();
    }
  }
}
