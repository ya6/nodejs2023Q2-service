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
  artist: {},
  track: {},
  album: {},
  favorites: {},
};
export default db;
