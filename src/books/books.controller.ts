import {
  Get,
  Post,
  Delete,
  Controller,
  Body,
  Param,
  Put,
} from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from './interfaces';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getBooks() {
    return await this.booksService.getBooks();
  }

  @Get(':id')
  async getBook(@Param('id') id: string) {
    return await this.booksService.getBook(id);
  }

  @Post()
  async createBook(@Body() book: CreateBookDto) {
    return await this.booksService.createBook(book);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    return await this.booksService.deleteBook(id);
  }

  @Put(':id')
  async updateBook(@Param('id') id: string, @Body() book: UpdateBookDto) {
    return await this.booksService.updateBook(id, book);
  }
}
