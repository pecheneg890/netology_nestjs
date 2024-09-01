const inversify = require("inversify");
require("reflect-metadata");
const BooksRepository = require("./book-repository");

// Declare BooksRepository as injectable
inversify.decorate(inversify.injectable(), BooksRepository);

//Create container
const container = new inversify.Container();

//Declare bindings 
container.bind(BooksRepository).toSelf();

module.exports = container;