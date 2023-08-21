import { Module, Global } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from '../../entities/track.entity';
import { Artist } from 'src/entities/artist.entity';
import { Album } from 'src/entities/album.entity';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Track, Artist, Album])],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
