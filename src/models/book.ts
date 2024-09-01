import { Schema, SchemaTypes, Document, model } from 'mongoose';
import {Book} from '../book-repository';

const bookSchema = new Schema({
    title: {
        type: SchemaTypes.String,
        required: true,
    },
    description: {
        type: SchemaTypes.String,
        default: "",
    },
    authors: {
        type: SchemaTypes.String,
        default: "",
    },
    favorite: {
        type: SchemaTypes.String,
        default: "",
    },
    fileCover: {
        type: SchemaTypes.String,
        default: "",
    },
    fileName: {
        type: SchemaTypes.String,
        default: "",
    },
    fileBook: {
        type: SchemaTypes.String,
        default: ""
    }
});

export default model<Book & Document>('Book', bookSchema);