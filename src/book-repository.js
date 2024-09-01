const Book = require('./models/book');
const { v4: uuid } = require('uuid');

class BooksRepository {
    async getAll() {
        return await Book.find().select('-__v');
    }

    async getOne(id) {
        return await Book.findById(id).select('-__v');
    }

    async update(id, content) {
        return await Book.findByIdAndUpdate(id, content, { returnDocument: 'after' }).select('-__v');
    }

    async delete(id) {
        return await Book.findByIdAndDelete(id);
    }

    async create(content) {
        const newBook = new Book(content);
        await newBook.save();
        return newBook.toObject({ versionKey: false });
    }
};

module.exports = BooksRepository;
