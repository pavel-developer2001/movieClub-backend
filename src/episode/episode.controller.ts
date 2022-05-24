import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  forwardRef,
  Inject,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/user/user.decorator';
import { TeamEpisodeService } from 'src/team-episode/team-episode.service';

@Controller('episode')
export class EpisodeController {
  constructor(
    private readonly episodeService: EpisodeService,
    @Inject(forwardRef(() => CloudinaryService))
    private cloudinary: CloudinaryService,
    private readonly teamEpisodeService: TeamEpisodeService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('video'))
  @Post()
  async create(
    @Body() createEpisodeDto: CreateEpisodeDto,
    @UploadedFile() file: Express.Multer.File,
    @User() userId: number,
  ) {
    const newEpisode = await this.episodeService.create(
      createEpisodeDto,
      userId,
    );
    await this.cloudinary.uploadEpisodeVideo(file, newEpisode._id);
    if (createEpisodeDto.teamId) {
      await this.teamEpisodeService.addEpisodeForTeam(
        newEpisode._id,
        Number(newEpisode.movieId),
        createEpisodeDto.teamId,
      );
    }
    return this.episodeService.findOne(newEpisode._id);
  }

  @Get()
  findAll() {
    return this.episodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.episodeService.findOne(+id);
  }

  @Get('movie/:id')
  findAllForMovie(@Param('id') id: string) {
    return this.episodeService.findAllMovie(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEpisodeDto: UpdateEpisodeDto) {
    return this.episodeService.update(+id, updateEpisodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.episodeService.remove(+id);
  }
}
