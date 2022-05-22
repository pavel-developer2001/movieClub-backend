import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/user/user.decorator';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createRatingDto: CreateRatingDto, @User() userId: number) {
    return this.ratingService.create(createRatingDto, userId);
  }

  @Get()
  findAll() {
    return this.ratingService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @User() userId: number) {
    return this.ratingService.findOne(+id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@User() userId: number, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingService.update(updateRatingDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratingService.remove(+id);
  }
}
