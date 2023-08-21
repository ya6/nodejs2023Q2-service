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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { uuidDto } from 'src/common/dto/uuid.dto';

@ApiBearerAuth()
@ApiTags('Artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistService.create(createArtistDto);
  }

  @Get()
  async findAll() {
    return await this.artistService.findAll();
  }

  @Get(':id')
  async findOne(
    @Res({ passthrough: true }) response: Response,
    @Param() idDto: uuidDto,
  ) {
    const { id } = idDto;
    const artist = await this.artistService.findOne(id);

    if (artist === null) {
      response.status(404).send();
    }
    if (artist) {
      response.status(200).send(artist);
    }
  }

  @Put(':id')
  async update(
    @Res({ passthrough: true }) response: Response,
    @Param() idDto: uuidDto,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const { id } = idDto;
    const artist = await this.artistService.update(id, updateArtistDto);

    if (artist === null) {
      response.status(404).send();
    }
    if (artist) {
      response.status(200).send(artist);
    }
  }

  @Delete(':id')
  async remove(@Res() response: Response, @Param() idDto: uuidDto) {
    const { id } = idDto;
    const result = await this.artistService.remove(id);
    if (result === 0) {
      response.status(404).send();
    }
    if (result === 1) {
      response.status(204).send();
    }
  }
}
