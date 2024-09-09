import { Injectable } from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from './interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './schemas/book.schema';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private BookModel: Model<BookDocument>) {}

  async getBooks(): Promise<BookDocument[]> {
    return await this.BookModel.find().exec();
  }

  async createBook(bookDto: CreateBookDto): Promise<BookDocument> {
    const book = new this.BookModel(bookDto);
    return await book.save();
  }

  async deleteBook(id: string): Promise<BookDocument> {
    return await this.BookModel.findByIdAndDelete(id);
  }

  async getBook(id: string): Promise<BookDocument> {
    return await this.BookModel.findById(id);
  }

  async updateBook(id: string, book: UpdateBookDto): Promise<BookDocument> {
    return await this.BookModel.findByIdAndUpdate(id, book);
  }
}
