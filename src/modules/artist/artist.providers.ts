import { Artist } from 'src/entities/artist.entity';
import { DataSource } from 'typeorm';


export const artistProviders = [
  {
    provide: 'ARTIST_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Artist),
    inject: ['DATA_SOURCE'],
  },
];
