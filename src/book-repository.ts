import Book from './models/book';
//import { v4 as uuid } from 'uuid';

class BooksRepository {
    async getAll() {
        return await Book.find().select('-__v');
    }

    async getOne(id: any) {
        return await Book.findById(id).select('-__v');
    }

    async update(id: any, content: any) {
        return await Book.findByIdAndUpdate(id, content, { returnDocument: 'after' }).select('-__v');
    }

    async delete(id: any) {
        return await Book.findByIdAndDelete(id);
    }

    async create(content: any) {
        const newBook = new Book(content);
        await newBook.save();
        return newBook.toObject({ versionKey: false });
    }
};

export default BooksRepository;
