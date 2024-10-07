import { CreateBookDto, UpdateBookDto } from './interfaces';
import { v4 as uuidv4 } from 'uuid';

export class BookModel {
	constructor() {
		function newBook(bookDto: CreateBookDto) {
			const book = {
				id: uuidv4(),
				...bookDto,
				save() {
					newBook.books.set(this.id, this);
					return newBook.books.get(this.id);
				},
			};
			return book;
		}

		newBook.books = new Map<string, any>();
		newBook.findById = (id: string) => {
			return newBook.books.get(id);
		};

		newBook.find = () => {
			return {
				exec() {
					const result = [];
					newBook.books.forEach((val) => result.push(val));
					return result;
				},
			};
		};

		newBook.findByIdAndDelete = (id) => {
			newBook.books.delete(id);
		};

		newBook.findByIdAndUpdate = (id: string, book: UpdateBookDto) => {
			newBook.books.set(id, book);
		};

		return newBook;
	}
}
