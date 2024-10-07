import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getModelToken } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { BookModel } from './book.model.test';

describe('BooksService', () => {
	let service: BooksService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				BooksService,
				{
					provide: getModelToken(Book.name),
					useClass: BookModel,
				},
			],
		}).compile();

		service = await module.resolve<BooksService>(BooksService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('check createBook', async () => {
		const book = await service.createBook({
			title: 'title',
			description: 'description',
			authors: 'authors',
			favorite: 'favorite',
			fileCover: 'filecover',
			fileName: 'fileName',
			fileBook: 'fileBook',
			comment: ['comment1'],
		});

		expect(await service.getBook(book.id)).toEqual(book);
	});

	it('check getBooks', async () => {
		await service.createBook({
			title: 'title1',
			description: 'description',
			authors: 'authors',
			favorite: 'favorite',
			fileCover: 'filecover',
			fileName: 'fileName',
			fileBook: 'fileBook',
			comment: ['comment1'],
		});
		await service.createBook({
			title: 'title2',
			description: 'description',
			authors: 'authors',
			favorite: 'favorite',
			fileCover: 'filecover',
			fileName: 'fileName',
			fileBook: 'fileBook',
			comment: ['comment1'],
		});

		expect((await service.getBooks()).length).toEqual(2);
	});

	it('check update book', async () => {
		const book = await service.createBook({
			title: 'title1',
			description: 'description',
			authors: 'authors',
			favorite: 'favorite',
			fileCover: 'filecover',
			fileName: 'fileName',
			fileBook: 'fileBook',
			comment: ['comment1'],
		});
		await service.updateBook(book.id, { title: 'title2' });

		expect((await service.getBook(book.id)).title).toEqual('title2');
	});

	it('check delete book', async () => {
		const book = await service.createBook({
			title: 'title1',
			description: 'description',
			authors: 'authors',
			favorite: 'favorite',
			fileCover: 'filecover',
			fileName: 'fileName',
			fileBook: 'fileBook',
			comment: ['comment1'],
		});
		await service.deleteBook(book.id);

		expect((await service.getBooks()).length).toEqual(0);
	});
});
