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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/user/user.decorator';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';

@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createBookmarkDto: CreateBookmarkDto, @User() userId: number) {
    return this.bookmarkService.create(createBookmarkDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/movie/:id')
  async getBookMarkForManga(@Param('id') id: string, @User() userId: number) {
    return await this.bookmarkService.getMarkForMovie(+id, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookmarkService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@User() userId: number, @Body() updateBookmarkDto: UpdateBookmarkDto) {
    return this.bookmarkService.update(updateBookmarkDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookmarkService.remove(+id);
  }
}
