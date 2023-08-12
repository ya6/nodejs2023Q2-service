import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/entities/album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album) private albumRepository: Repository<Album>,
  ) {}
  async create(reateAlbumDto: CreateAlbumDto) {
    const { name, year, artistId } = reateAlbumDto; // ???
    const artist = {};
    const newAlbum = this.albumRepository.create({
      id: uuidv4(),
      name,
      year,
      artist: artist || null, // refers to Artist
    });
    const createdAlbum = await this.albumRepository.save(newAlbum);
    return createdAlbum;
  }

  async findAll() {
    return await this.albumRepository.find();
  }
  async findFavorites() {
    return await this.albumRepository.find({
      relations: {
        artist: true,
      },
      where: { isFavorite: true },
      select: { id: true, name: true, year: true, artist: { id: true } },
    });
  }

  async findOne(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (album === null) {
      return null;
    }

    const chagedAlbum = {
      ...album,
      ...updateAlbumDto,
    };
    const updatedAlbumt = await this.albumRepository.save(chagedAlbum);
    return updatedAlbumt;
  }

  async remove(id: string) {
    const { affected } = await this.albumRepository.delete(id);
    return affected;
  }
}
