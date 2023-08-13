import { Global, Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from '../../entities/album.entity';
import { Artist } from 'src/entities/artist.entity';
import { DatabaseModule } from '../database/database.module';
import { albumProviders } from './album.providers';
import { artistProviders } from '../artist/artist.providers';

@Global()
@Module({
  imports: [DatabaseModule],
  controllers: [AlbumController],
  providers: [...albumProviders, ...artistProviders, AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
