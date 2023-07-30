import { IUser, IArtist, ITrack, IAlbum, IFavorites } from '../types/Types';
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
      db.user.data = [...db.user.data.filter((user) => user.id !== id)];
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
    data: [
      {
        id: 'b42ca906-b273-4315-97a0-0df2352aa6eb',
        login: 'alex',
        password: 'pwd',
        version: 1,
        createdAt: 1690639785750,
        updatedAt: 1690639785750,
      },
    ],
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
      db.track.data = [...db.track.data.filter((track) => track.id !== id)];
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
    data: [
      {
        id: '292cce2a-4fb0-4503-8496-ee29a4937646',
        name: 'TEST_TRACK',
        artistId: null,
        albumId: null,
        duration: 199,
      },
    ],
  },
  artist: {},
  album: {},
  favorites: {},
};
export default db;
