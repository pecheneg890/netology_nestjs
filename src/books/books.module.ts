import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schemas/book.schema';
import { BooksGateway } from './books.gateway';
import { BookCommentService } from './book-comment.service';
import { BookComment, BookCommentSchema } from './schemas/book-comment.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: BookComment.name,
				schema: BookCommentSchema,
			},
			{
				name: Book.name,
				schema: BookSchema,
			},
		]),
	],
	providers: [BooksService, BooksGateway, BookCommentService],
	controllers: [BooksController],
})
export class BooksModule {}
