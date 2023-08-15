import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from '../../entities/track.entity';
import { Repository } from 'typeorm';
import { Artist } from 'src/entities/artist.entity';
import { Album } from 'src/entities/album.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track) private trackRepository: Repository<Track>,
    @InjectRepository(Artist) private artistRepository: Repository<Artist>,
    @InjectRepository(Album) private albumRepository: Repository<Album>,
  ) {}
  async create(createTrackDto: CreateTrackDto) {
    const { name, artistId, albumId, duration } = createTrackDto; //???
    let artist = null;
    let album = null;
    if (artistId) {
      artist = await this.artistRepository.findOne({ where: { id: artistId } });
    }
    if (albumId) {
      album = await this.albumRepository.findOne({ where: { id: albumId } });
    }

    const newTrack = this.trackRepository.create({
      id: uuidv4(),
      name,
      artist: artist,
      album: album,
      duration,
    });

    const createdTrack = await this.trackRepository.save(newTrack);

    return this.cleanTrack(createdTrack);
  }

  async findAll() {
    const tracks = await this.trackRepository.find();
    return tracks;
  }

  async findFavorites() {
    const favTracks = await this.trackRepository.find({
      relations: {
        artist: true,
        album: true,
      },
      where: { isFavorite: true },
      select: {
        id: true,
        name: true,
        artist: { id: true },
        album: { id: true },
        duration: true,
      },
    });
    return favTracks.map((el) => this.cleanTrack(el));
  }

  async findOne(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });
    return this.cleanTrack(track);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (track === null) {
      return null;
    }

    const chagedTrack = {
      ...track,
      ...updateTrackDto,
    };
    const updatedTrack = this.trackRepository.save(chagedTrack);
    return updatedTrack;
  }

  async remove(id: string) {
    const { affected } = await this.trackRepository.delete(id);
    return affected;
  }

  cleanTrack(track) {
    if (!track) {
      return null;
    }
    const { isFavorite, album, artist, ...rest } = track;
    return {
      ...rest,
      albumId: track.album?.id || null,
      artistId: track.artist?.id || null,
    };
  }
}
