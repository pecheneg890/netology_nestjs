interface Book {
    id: string;
    title: string;
    description: string;
    authors: string;
    favorite: string;
    fileCover: string;
    fileName: string;
    fileBook: string;
    comment: string[];
}

abstract class BooksRepository {
    //создание книги
    createBook(book: Book){

    };

    //получение книги по id.
    getBook(id: string){

    }
    //получение всех книг
    getBooks(){

    }
    //обновление книги
    updateBook(id: string){

    }
    //удаление книги
    deleteBook(id: string){

    }
}