import { Test, TestingModule } from '@nestjs/testing';
import { BooksGateway } from './books.gateway';

describe('BooksGateway', () => {
	let gateway: BooksGateway;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [BooksGateway],
		}).compile();

		gateway = module.get<BooksGateway>(BooksGateway);
	});

	it('should be defined', () => {
		expect(gateway).toBeDefined();
	});
});
