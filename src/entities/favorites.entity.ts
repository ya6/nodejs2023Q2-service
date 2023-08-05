import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from './artist.entity';
import { Album } from './album.entity';
import { Track } from './track.entity';

@Entity()
export class Favorites {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
