import { Injectable, Inject } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/entities/album.entity';
import { Repository } from 'typeorm';
import { Artist } from 'src/entities/artist.entity';

@Injectable()
export class AlbumService {
  constructor(
    @Inject('ALBUM_REPOSITORY')
    private albumRepository: Repository<Album>,
    @Inject('ARTIST_REPOSITORY')
    private artistRepository: Repository<Artist>,
  ) {}

  async create(reateAlbumDto: CreateAlbumDto) {
    const { name, year, artistId } = reateAlbumDto; // ???

    let artist = null;
    if (artistId) {
      artist = await this.artistRepository.findOne({ where: { id: artistId } });
    }
    const newAlbum = this.albumRepository.create({
      id: uuidv4(),
      name,
      year,
      artist: artist, // refers to Artist
    });
    const createdAlbum = await this.albumRepository.save(newAlbum);

    return this.cleanAlbum(createdAlbum);
  }

  async findAll() {
    const albums = await this.albumRepository.find();
    return albums;
  }

  async findFavorites() {
    const favAlbums = await this.albumRepository.find({
      relations: {
        artist: true,
      },
      where: { isFavorite: true },
      select: { id: true, name: true, year: true, artist: { id: true } },
    });
    return favAlbums.map((el) => this.cleanAlbum(el));
  }

  async findOne(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });
    return this.cleanAlbum(album);
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

  cleanAlbum(album) {
    if (!album) {
      return null;
    }
    const { isFavorite, artist, ...rest } = album;
    return {
      ...rest,
      artistId: album.artist?.id || null,
    };
  }
}
