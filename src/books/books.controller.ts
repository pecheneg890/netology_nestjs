import {
  Get,
  Post,
  Delete,
  Controller,
  Body,
  Param,
  Put,
} from '@nestjs/common';
import { Book, CreateBookDto, UpdateBookDto } from './interfaces';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getBooks(): Book[] {
    return this.booksService.getBooks();
  }

  @Get(':id')
  getBook(@Param('id') id: string): Book {
    return this.booksService.getBook(id);
  }

  @Post()
  createBook(@Body() book: CreateBookDto) {
    this.booksService.createBook(book);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: string) {
    this.booksService.deleteBook(id);
  }

  @Put(':id')
  updateBook(@Param('id') id: string, @Body() book: UpdateBookDto) {
    this.booksService.updateBook(id, book);
  }
}
