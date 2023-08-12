import { Injectable } from '@nestjs/common';
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
  async findAll() {
    // del is Fav check output
    const favArtists = await this.artistService.findFavorites();
    // console.log('-- favArtists --> ', favArtists);

    const favAlbums = await this.albumService.findFavorites();
    console.log('-- favAlbums --> ', favAlbums);
    const favTracks = await this.trackService.findFavorites(); //  ? change to find with relations ?
    return { artists: favArtists, albums: favAlbums, tracks: favTracks };
  }
  // track
  async createFavTrack(id: string) {
    const track = await this.trackService.findOne(id);
    if (track === null) {
      return null;
    }
    await this.trackService.update(id, { isFavorite: true });
    return id; // ???
  }
  async removeFavTrack(id: string) {
    const track = await this.trackService.findOne(id);
    if (track === null) {
      return null;
    }
    return await this.trackService.update(id, { isFavorite: false });
  }

  // artist
  async createFavArtist(id: string) {
    console.log('createFavArtist-->', id);
    const artist = await this.artistService.findOne(id);
    console.log('artist', artist);
    if (artist === null) {
      return null;
    }
    await this.artistService.update(id, { isFavorite: true });
    return id;
  }
  async removeFavArtist(id: string) {
    const artist = await this.artistService.findOne(id);
    if (artist === null) {
      return null;
    }
    await this.artistService.update(id, { isFavorite: false });
  }
  // album
  async createFavAlbum(id: string) {
    console.log('createFavAlbum-->', id);

    const album = await this.albumService.findOne(id);
    console.log('album', album);

    if (album === null) {
      return null;
    }
    await this.albumService.update(id, { isFavorite: true });
    return id;
  }

  async removeFavAlbum(id: string) {
    const album = await this.albumService.findOne(id);
    if (album === null) {
      return null;
    }
    await this.albumService.update(id, { isFavorite: false });
  }
}
