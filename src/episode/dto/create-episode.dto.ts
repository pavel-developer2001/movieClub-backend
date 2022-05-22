import { IsOptional } from 'class-validator';
export class CreateEpisodeDto {
  @IsOptional()
  season?: string;

  @IsOptional()
  episode?: string;

  movieId: string;
}
