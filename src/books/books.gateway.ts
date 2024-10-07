import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { BookCommentService } from './book-comment.service';

@WebSocketGateway()
export class BooksGateway {
	constructor(private readonly booksCommentService: BookCommentService) {}

	@SubscribeMessage('getAllComments')
	async getAllComments(@MessageBody('bookId') bookId: string): Promise<string> {
		return JSON.stringify(await this.booksCommentService.getAllComments(bookId));
	}

	@SubscribeMessage('addComment')
	async addComment(
		@MessageBody('bookId') bookId: string,
		@MessageBody('comment') comment: string,
	): Promise<string> {
		await this.booksCommentService.addComment(bookId, comment);
		return 'comment added';
	}
}
