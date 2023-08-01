import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import db from 'src/db/db';

@Injectable()
export class ArtistService {
  create(createArtistDto: CreateArtistDto) {
    const { name, grammy } = createArtistDto;

    const newArtist = db.artist.create({
      id: uuidv4(),
      name,
      grammy,
    });
    const createdArtist = db.artist.save(newArtist);
    return createdArtist;
  }

  findAll() {
    const artists = db.artist.findAll();
    return artists;
  }

  findOne(id: string) {
    const artist = db.artist.findOne(id);
    if (artist === undefined) {
      return undefined;
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = db.artist.findOne(id);
    if (artist === undefined) {
      return undefined;
    }

    const chagedArtist = {
      ...artist,
      ...updateArtistDto,
    };
    const updatedArtist = db.artist.update(chagedArtist);
    return updatedArtist;
  }

  remove(id: string) {
    return db.artist.delete(id);
  }
}
