import { Global, Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { DatabaseModule } from '../database/database.module';
import { artistProviders } from './artist.providers';
@Global()
@Module({
  imports: [DatabaseModule],
  controllers: [ArtistController],
  providers: [...artistProviders, ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
