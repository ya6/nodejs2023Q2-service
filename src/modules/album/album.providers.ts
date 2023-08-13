import { DataSource } from 'typeorm';
import { Album } from 'src/entities/album.entity';

export const albumProviders = [
  {
    provide: 'ALBUM_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Album),
    inject: ['DATA_SOURCE'],
  },
];
