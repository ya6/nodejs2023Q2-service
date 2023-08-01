import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import db from 'src/db/db';

@Injectable()
export class AlbumService {
  create(reateAlbumDto: CreateAlbumDto) {
    const { name, year, artistId } = reateAlbumDto; // ???

    const newAlbum = db.album.create({
      id: uuidv4(),
      name,
      year,
      artistId: artistId || null, // refers to Artist
    });
    const createdAlbum = db.album.save(newAlbum);
    return createdAlbum;
  }

  findAll() {
    const albums = db.album.findAll();
    return albums;
  }

  findOne(id: string) {
    const album = db.album.findOne(id);
    if (album === undefined) {
      return undefined;
    }
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = db.album.findOne(id);
    if (album === undefined) {
      return undefined;
    }

    const chagedAlbum = {
      ...album,
      ...updateAlbumDto,
    };
    const updatedAlbumt = db.album.update(chagedAlbum);
    return updatedAlbumt;
  }

  remove(id: string) {
    return db.album.delete(id);
  }
}
