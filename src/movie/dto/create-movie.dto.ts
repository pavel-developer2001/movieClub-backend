import { Length } from 'class-validator';

export class CreateMovieDto {
  @Length(3, 255)
  title: string;

  @Length(3)
  englishTitle: string;

  @Length(3, 1500)
  description: string;

  status: string;

  @Length(4)
  year: number;

  @Length(1)
  munites: number;

  @Length(1)
  country: string;

  @Length(1)
  age: string;

  @Length(1)
  type: string;

  genres: [];
}
