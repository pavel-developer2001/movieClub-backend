import { CloudinaryModule } from './../cloudinary/cloudinary.module';
import { Module, forwardRef } from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { EpisodeController } from './episode.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpisodeEntity } from './entities/episode.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EpisodeEntity]),
    forwardRef(() => CloudinaryModule),
  ],
  controllers: [EpisodeController],
  providers: [EpisodeService],
  exports: [EpisodeService],
})
export class EpisodeModule {}
