import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Artist } from './artist.entity';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: string;

  // @Column({ nullable: true })
  // artistId: string;

  @ManyToOne(() => Artist, (artist) => artist.albums)
  artist: Artist;
}
