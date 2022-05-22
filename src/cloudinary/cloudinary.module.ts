import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EpisodeModule } from 'src/episode/episode.module';
import { MovieModule } from 'src/movie/movie.module';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';

@Module({
  imports: [
    forwardRef(() => MovieModule),
    forwardRef(() => EpisodeModule),
    ConfigModule,
  ],
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}
