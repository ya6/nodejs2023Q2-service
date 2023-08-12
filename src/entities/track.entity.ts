import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Album } from './album.entity';
import { Artist } from './artist.entity';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  isFavorite: boolean;

  @OneToOne(() => Artist, () => {}, { onDelete: 'SET NULL' })
  @JoinColumn()
  artist: Artist;

  @OneToOne(() => Album, () => {}, { onDelete: 'SET NULL' })
  @JoinColumn()
  album: Album;

  @Column()
  duration: number;
}

//  @ManyToOne(() => Artist, (artist) => artist.albums, { onDelete: 'SET NULL' })
//   artist: Artist;
