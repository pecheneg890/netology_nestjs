import * as inversify from "inversify";
import BooksRepository from "./book-repository";

const a = new BooksRepository();
// Declare BooksRepository as injectable
inversify.decorate(inversify.injectable(), BooksRepository);

//Create container
const container = new inversify.Container();

//Declare bindings 
container.bind(BooksRepository).toSelf();

export default container;