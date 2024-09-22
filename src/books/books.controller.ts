import {
  Get,
  Post,
  Delete,
  Controller,
  Body,
  Param,
  Put,
  UsePipes,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from './dto/books.dto';
import { BooksService } from './books.service';
import { IdValidationPipe } from './validation/id.validation.pipe';
import { BookValidationPipe } from './validation/book.validation.pipe';
import { LoggingInterceptor } from './book.logging.interceptor';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
@UseInterceptors(LoggingInterceptor)
@UseGuards(AuthGuard('jwt'))
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getBooks() {
    return await this.booksService.getBooks();
  }

  @Get(':id')
  async getBook(@Param('id', IdValidationPipe) id: string) {
    return await this.booksService.getBook(id);
  }

  @Post()
  @UsePipes(new BookValidationPipe())
  async createBook(@Body() book: CreateBookDto) {
    await this.booksService.createBook(book);
  }

  @Delete(':id')
  async deleteBook(@Param('id', IdValidationPipe) id: string) {
    return await this.booksService.deleteBook(id);
  }

  @Put(':id')
  async updateBook(
    @Param('id', IdValidationPipe) id: string,
    @Body(new BookValidationPipe()) book: UpdateBookDto,
  ) {
    return await this.booksService.updateBook(id, book);
  }
}
