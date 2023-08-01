import { IUser, IArtist, ITrack, IAlbum } from '../types/Types';
const db = {
  user: {
    create: (user: IUser): IUser => {
      return user;
    },
    save: (user: IUser): IUser => {
      db.user.data.push(user);
      return user;
    },
    delete: (id: string) => {
      const user = db.user.findOne(id);
      if (!user) {
        return undefined;
      }
      db.user.data = db.user.data.filter((us) => us.id !== id);
      return null;
    },
    update: (updatedUser: IUser) => {
      db.user.data = [
        ...db.user.data.map((user) =>
          user.id === updatedUser.id ? updatedUser : user,
        ),
      ];
      return updatedUser;
    },

    findAll: (): IUser[] | [] => {
      return db.user.data;
    },
    findOne: (id: string): IUser | undefined => {
      return db.user.data.find((user) => user.id === id);
    },
    data: [],
  },
  track: {
    create: (track: ITrack): ITrack => {
      return track;
    },
    save: (track: ITrack): ITrack => {
      db.track.data.push(track);
      return track;
    },
    delete: (id: string) => {
      const track = db.track.findOne(id);
      if (!track) {
        return undefined;
      }
      db.track.data = db.track.data.filter((tr) => tr.id !== id);
      db.favorites.data.tracks = db.favorites.data.tracks.filter(
        (el) => el.id !== id,
      );
      return null;
    },
    update: (updatedTrack: ITrack) => {
      db.track.data = [
        ...db.track.data.map((track) =>
          track.id === updatedTrack.id ? updatedTrack : track,
        ),
      ];
      return updatedTrack;
    },
    findAll: (): ITrack[] | [] => {
      return db.track.data;
    },
    findOne: (id: string): ITrack | undefined => {
      return db.track.data.find((track) => track.id === id);
    },
    data: [],
  },
  artist: {
    create: (artist: IArtist): IArtist => {
      return artist;
    },
    save: (artist: IArtist): IArtist => {
      db.artist.data.push(artist);
      return artist;
    },
    delete: (id: string) => {
      const artist = db.artist.findOne(id);
      if (!artist) {
        return undefined;
      }
      db.artist.data = db.artist.data.filter((art) => art.id !== id);
      db.favorites.data.artists = db.favorites.data.artists.filter(
        (el) => el.id !== id,
      );
      db.track.data = db.track.data.map((tr) =>
        tr.artistId === id ? { ...tr, artistId: null } : tr,
      );
      db.album.data = db.album.data.map((al) =>
        al.artistId === id ? { ...al, artistId: null } : al,
      );
      return null;
    },
    update: (updatedArtist: IArtist) => {
      db.artist.data = [
        ...db.artist.data.map((artist) =>
          artist.id === updatedArtist.id ? updatedArtist : artist,
        ),
      ];
      return updatedArtist;
    },
    findAll: (): IArtist[] | [] => {
      return db.artist.data;
    },
    findOne: (id: string) => {
      return db.artist.data.find((artist) => artist.id === id);
    },
    data: [],
  },
  album: {
    create: (album: IAlbum): IAlbum => {
      return album;
    },
    save: (album: IAlbum): IAlbum => {
      db.album.data.push(album);
      return album;
    },
    delete: (id: string) => {
      const album = db.album.findOne(id);
      if (!album) {
        return undefined;
      }
      db.album.data = db.album.data.filter((alb) => alb.id !== id);
      db.favorites.data.albums = db.favorites.data.albums.filter(
        (el) => el.id !== id,
      );
      db.track.data = db.track.data.map((tr) =>
        tr.albumId === id ? { ...tr, albumId: null } : tr,
      );
      return null;
    },
    update: (updatedAlbum: IAlbum) => {
      db.album.data = [
        ...db.album.data.map((album) =>
          album.id === updatedAlbum.id ? updatedAlbum : album,
        ),
      ];
      return updatedAlbum;
    },
    findAll: (): IAlbum[] | [] => {
      return db.album.data;
    },
    findOne: (id: string): IAlbum | undefined => {
      return db.album.data.find((album) => album.id === id);
    },
    data: [],
  },
  favorites: {
    findOne(id: string, resourceName: string) {
      const result = db.favorites.data[resourceName].find((el) => el.id === id);
      return result;
    },
    save(id: string, resourceName: string, entity) {
      const result = db.favorites.findOne(id, resourceName);
      if (result === undefined) {
        db.favorites.data[resourceName].push(structuredClone(entity));
      }
    },
    delete: (id: string, resourceName: string) => {
      const result = db.favorites.findOne(id, resourceName);
      if (result === undefined) {
        return undefined;
      }
      db.favorites.data[resourceName] = [
        ...db.favorites.data[resourceName].filter((el) => el.id !== id),
      ];

      return null;
    },
    data: { artists: [], albums: [], tracks: [] },
  },
};
export default db;
