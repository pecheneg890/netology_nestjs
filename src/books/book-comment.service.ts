import { Injectable } from '@nestjs/common';
import { BookComment, BookCommentDocument } from './schemas/book-comment.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BookCommentService {
	constructor(
		@InjectModel(BookComment.name) private bookCommentModel: Model<BookCommentDocument>,
	) {}

	async getAllComments(bookId: string) {
		return this.bookCommentModel.find({ bookId: bookId }).exec();
	}

	async addComment(bookId: string, comment: string) {
		return await this.bookCommentModel.create({
			bookId,
			comment,
		});
	}
}
