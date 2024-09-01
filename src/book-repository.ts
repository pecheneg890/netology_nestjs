import { injectable } from 'inversify';
import bookModel from './models/book';
//import { v4 as uuid } from 'uuid';
import "reflect-metadata";

interface Book {
    id: string;
    title: string;
    description: string;
    authors: string;
    favorite: string;
    fileCover: string;
    fileName: string;
    fileBook: string;
}

interface CreateBookDto{
    title: Book['title'];
    description: Book['description'];
    authors: Book['authors'];
    favorite: Book['favorite'];
    fileCover: Book['fileCover'];
    fileName: Book['fileName'];
    fileBook: Book['fileBook'];
}

interface UpdateBookDto{
    title: Book['title'];
    description: Book['description'];
    authors: Book['authors'];
    favorite: Book['favorite'];
    fileCover: Book['fileCover'];
}

@injectable()
class BooksRepository {
    async getAll(): Promise<Book[]> {
        return await bookModel.find().select('-__v');
    }

    async getOne(id: Book['id']): Promise<Book> {
        return await bookModel.findById(id).select('-__v');
    }

    async update(id: Book['id'], content: UpdateBookDto): Promise<Book> {
        return await bookModel.findByIdAndUpdate(id, content, { returnDocument: 'after' }).select('-__v');
    }

    async delete(id: Book['id']): Promise<boolean> {
        const result = await bookModel.findByIdAndDelete(id)
        if (result === null) return false; else return true;
    }

    async create(content: CreateBookDto): Promise<Book> {
        const newBook = new bookModel(content);
        await newBook.save();
        return newBook.toObject({ versionKey: false });
    }
};

export {BooksRepository, CreateBookDto, Book, UpdateBookDto};
