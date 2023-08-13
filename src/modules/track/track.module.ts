import { Module, Global } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { Artist } from 'src/entities/artist.entity';
import { Album } from 'src/entities/album.entity';
import { DatabaseModule } from '../database/database.module';
import { trackProviders } from './track.providers';
import { artistProviders } from '../artist/artist.providers';
import { albumProviders } from '../album/album.providers';
@Global()
@Module({
  imports: [DatabaseModule],
  controllers: [TrackController],
  providers: [
    ...trackProviders,
    ...artistProviders,
    ...albumProviders,
    TrackService,
  ],
  exports: [TrackService],
})
export class TrackModule {}
