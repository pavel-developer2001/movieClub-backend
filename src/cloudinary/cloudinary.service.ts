import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import { EpisodeService } from 'src/episode/episode.service';
import { MovieService } from 'src/movie/movie.service';
import { TeamService } from 'src/team/team.service';


@Injectable()
export class CloudinaryService {
  constructor(
    @Inject(forwardRef(() => MovieService))
    private movieService: MovieService,
    @Inject(forwardRef(() => EpisodeService))
    private episodeService: EpisodeService,
    @Inject(forwardRef(() => TeamService))
    private teamService: TeamService,
  ) {}
  async uploadMovieCover(file: Express.Multer.File, id: number): Promise<any> {
    try {
      if (!file) {
        return '';
      }
      v2.uploader
        .upload_stream({ resource_type: 'auto' }, (error, result) => {
          if (error || !result) {
            console.error('ERRRRRRRRRROOOOOOOOORR ', error);
          }
          this.movieService.addMovieCover(result.url, id);
        })
        .end(file.buffer);
    } catch (error) {
      console.error(error);
    }
  }
  async uploadEpisodeVideo(
    file: Express.Multer.File,
    id: number,
  ): Promise<any> {
    try {
      if (!file) {
        return '';
      }
      v2.uploader
        .upload_stream({ resource_type: 'auto' }, (error, result) => {
          if (error || !result) {
            console.error('ERRRRRRRRRROOOOOOOOORR ', error);
          }
          this.episodeService.addEpisodeURL(result.url, id);
        })
        .end(file.buffer);
    } catch (error) {
      console.error(error);
    }
  }
  async uploadTeamCover(file: Express.Multer.File, id: number): Promise<any> {
    try {
      if (!file) {
        return '';
      }
      v2.uploader
        .upload_stream({ resource_type: 'auto' }, (error, result) => {
          if (error || !result) {
            console.error('ERRRRRRRRRROOOOOOOOORR ', error);
          }
          this.teamService.addTeamCover(result.url, id);
        })
        .end(file.buffer);
    } catch (error) {
      console.error(error);
    }
  }
}
