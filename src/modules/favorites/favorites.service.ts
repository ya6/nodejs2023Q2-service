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
    const favArtists = await this.artistService.findFavorites();
    const favAlbums = await this.albumService.findFavorites();
    const favTracks = await this.trackService.findFavorites();
    return { artists: favArtists, albums: favAlbums, tracks: favTracks };
  }
  // track
  async createFavTrack(id: string) {
    const track = await this.trackService.findOne(id);
    if (track === null) {
      return null;
    }
    return await this.trackService.update(id, { isFavorite: true });
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
    const artist = await this.artistService.findOne(id);

    if (artist === null) {
      return null;
    }
    return await this.artistService.update(id, { isFavorite: true });
  }

  async removeFavArtist(id: string) {
    const artist = await this.artistService.findOne(id);
    if (artist === null) {
      return null;
    }
    return await this.artistService.update(id, { isFavorite: false });
  }

  // album
  async createFavAlbum(id: string) {
    const album = await this.albumService.findOne(id);

    if (album === null) {
      return null;
    }
    return await this.albumService.update(id, { isFavorite: true });
  }

  async removeFavAlbum(id: string) {
    const album = await this.albumService.findOne(id);
    if (album === null) {
      return null;
    }
    return await this.albumService.update(id, { isFavorite: false });
  }
}
