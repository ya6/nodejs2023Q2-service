import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';
import db from 'src/db/db';

@Injectable()
export class TrackService {
  create(createTrackDto: CreateTrackDto) {
    const { name, artistId, albumId, duration } = createTrackDto; //???

    const newTrack = db.track.create({
      id: uuidv4(),
      name,
      artistId: artistId || null,
      albumId: albumId || null,
      duration,
    });
    const createdTrack = db.track.save(newTrack);
    return createdTrack;
  }

  findAll() {
    const tracks = db.track.findAll();
    return tracks;
  }

  findOne(id: string) {
    const track = db.track.findOne(id);
    if (track === undefined) {
      return undefined;
    }
    return track;
  }

  update(id: string, updatePasswordDto: UpdateTrackDto) {
    const track = db.track.findOne(id);
    if (track === undefined) {
      return undefined;
    }

    const chagedTrack = {
      ...track,
      ...UpdateTrackDto,
    };
    const updatedTrack = db.track.update(chagedTrack);
    return updatedTrack;
  }

  remove(id: string) {
    return db.track.delete(id);
  }
}
