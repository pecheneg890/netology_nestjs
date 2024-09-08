import { Injectable } from '@nestjs/common';
import { Book, CreateBookDto, UpdateBookDto } from './interfaces';

@Injectable()
export class BooksService {
  private readonly books: Book[] = [];

  getBooks(): Book[] {
    return this.books;
  }

  createBook(book: CreateBookDto): void {
    this.books.push(book);
  }

  deleteBook(id: string): void {
    const deleteIndex = this.books.findIndex((element) => element.id === id);
    if (deleteIndex < 0) throw new Error('Элемент не найден');
    this.books.splice(deleteIndex);
  }

  getBook(id: string): Book {
    const book = this.books.find((element) => element.id === id);
    if (!book) throw new Error('Элемент не найден');
    return book;
  }

  updateBook(id: string, book: UpdateBookDto): void {
    const updateIndex = this.books.findIndex((element) => element.id === id);
    if (updateIndex < 0) throw new Error('Элемент не найден');
    this.books.splice(updateIndex, 1, { id, ...book });
  }
}
