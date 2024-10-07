import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { getModelToken } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { BookModel } from './book.model.test';

describe('BooksController', () => {
	let controller: BooksController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [BooksController],
			providers: [
				BooksService,
				{
					provide: getModelToken(Book.name),
					useClass: BookModel,
				},
			],
		}).compile();

		controller = module.get<BooksController>(BooksController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
