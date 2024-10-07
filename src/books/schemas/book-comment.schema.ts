import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Book } from './book.schema';

export type BookCommentDocument = BookComment & Document;

@Schema()
export class BookComment {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book' })
	bookId: Book;

	@Prop()
	comment: string;
}

export const BookCommentSchema = SchemaFactory.createForClass(BookComment);
