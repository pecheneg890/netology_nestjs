import {Container} from "inversify";
import {BooksRepository} from "../book-repository";


//Create container
const container = new Container();

//Declare bindings 
container.bind(BooksRepository).toSelf();

export default container;