import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from '../../entities/track.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track) private trackRepository: Repository<Track>,
  ) {}
  async create(createTrackDto: CreateTrackDto) {
    const { name, artistId, albumId, duration } = createTrackDto; //???
    const artist = {}; // add load
    const album = {};

    const newTrack = this.trackRepository.create({
      id: uuidv4(),
      name,
      artist: artist || null,
      album: album || null,
      duration,
    });
    const createdTrack = this.trackRepository.save(newTrack);
    return createdTrack;
  }

  async findAll() {
    const tracks = await this.trackRepository.find();
    return tracks;
  }

  async findFavorites() {
    const tracks = await this.trackRepository.find({
      where: { isFavorite: true },
      select: {
        id: true,
        name: true,
        artist: { id: true },
        album: { id: true },
        duration: true,
      },
    });
    return tracks;
  }

  async findOne(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });
    return track;
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
}
