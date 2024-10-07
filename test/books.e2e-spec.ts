import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { BooksModule } from './../src/books/books.module';
import { Book } from '../src/books/schemas/book.schema';
import { getModelToken } from '@nestjs/mongoose';
import { BookModel } from '../src/books/book.model.test';

describe('BooksController (e2e)', () => {
	let app: INestApplication;
	let bookModel;

	beforeEach(async () => {
		bookModel = new BookModel();
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [BooksModule],
		})
			.overrideProvider(getModelToken(Book.name))
			.useValue(bookModel)
			.compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/books (GET)', () => {
		bookModel.books.set('123', { title: 'test', description: 'test' });

		return request(app.getHttpServer())
			.get('/books')
			.expect(200)
			.expect([{ title: 'test', description: 'test' }]);
	});

	it('/books/id (GET)', () => {
		bookModel.books.set('123', { title: 'test', description: 'test' });

		return request(app.getHttpServer())
			.get('/books/123')
			.expect(200)
			.expect({ title: 'test', description: 'test' });
	});

	it('/books (POST)', async () => {
		const newBook = { title: 'test', description: 'test' };

		const res = await request(app.getHttpServer()).post('/books').send(newBook);

		const createdBook = { ...newBook, id: res.body.id };

		return request(app.getHttpServer())
			.get(`/books/${res.body.id}`)
			.expect(200)
			.expect(createdBook);
	});

	it('/books (PUT)', async () => {
		bookModel.books.set('123', { title: 'test', description: 'test' });
		const updBook = { title: 'test1', description: 'test1' };

		await request(app.getHttpServer()).put('/books/123').send(updBook);

		return request(app.getHttpServer()).get(`/books/123`).expect(200).expect(updBook);
	});

	it('/books (DELETE)', async () => {
		bookModel.books.set('123', { title: 'test', description: 'test' });

		await request(app.getHttpServer()).delete('/books/123').expect(200);

		await request(app.getHttpServer()).get(`/books`).send().expect('[]');
	});

	afterAll(async () => {
		await app.close();
	});
});
