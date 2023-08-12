import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from 'src/entities/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist) private artistRepository: Repository<Artist>,
  ) {}
  async create(createArtistDto: CreateArtistDto) {
    const { name, grammy } = createArtistDto;

    const newArtist = this.artistRepository.create({
      id: uuidv4(),
      name,
      grammy,
    });
    const createdArtist = await this.artistRepository.save(newArtist);
    return createdArtist;
  }

  async findAll() {
    const artists = await this.artistRepository.find();
    return artists;
  }

  async findFavorites() {
    const artists = await this.artistRepository.find({
      where: { isFavorite: true },
      select: { id: true, name: true, grammy: true },
    });
    return artists;
  }

  async findOne(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    console.log('atrist update-->', id, updateArtistDto);

    const artist = await this.artistRepository.findOne({ where: { id } });
    console.log('artistServise update artist', artist);

    if (artist === null) {
      return null;
    }

    const chagedArtist = {
      ...artist,
      ...updateArtistDto,
    };
    const updatedArtist = await this.artistRepository.save(chagedArtist);
    return updatedArtist;
  }

  async remove(id: string) {
    const { affected } = await this.artistRepository.delete(id);
    return affected;
  }
}
