import { Injectable } from '@nestjs/common';
import db from 'src/db/db';
import { TrackService } from '../track/track.service';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
@Injectable()
export class FavoritesService {
  constructor(
    private readonly trackService: TrackService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
  ) {}
  findAll() {
    return db.favorites.data;
  }
  // track
  createFavTrack(id: string) {
    const track = this.trackService.findOne(id);
    if (track === undefined) {
      return undefined;
    }
    db.favorites.save(id, 'tracks', track);
    return id;
  }
  removeFavTrack(id: string) {
    return db.favorites.delete(id, 'tracks');
  }

  // artist
  createFavArtist(id: string) {
    const artist = this.artistService.findOne(id);
    if (artist === undefined) {
      return undefined;
    }
    db.favorites.save(id, 'artists', artist);
    return id;
  }
  removeFavArtist(id: string) {
    return db.favorites.delete(id, 'artists');
  }
  // album
  createFavAlbum(id: string) {
    const album = this.albumService.findOne(id);
    if (album === undefined) {
      return undefined;
    }
    db.favorites.save(id, 'albums', album);
    return id;
  }

  removeFavAlbum(id: string) {
    return db.favorites.delete(id, 'albums');
  }
}
