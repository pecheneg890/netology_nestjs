
import express from 'express';
import container from '../infrastructure/container';
const router = express.Router();
import { multerExt, BOOK_FOLDER } from '../middleware/file';
import path from 'node:path';
import { BooksRepository, CreateBookDto, Book, UpdateBookDto } from "../book-repository";

router.get('/', async (req, res) => {
    const repo: BooksRepository = container.get(BooksRepository);
    res.json(await repo.getAll());
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const repo: BooksRepository = container.get(BooksRepository);
        res.json(await repo.getOne(id));
    }
    catch (e) {
        res.status(404);
        res.json('Code: 404');
    }
});

router.post('/', multerExt.single('book'),
    async (req, res) => {
        try {
            const repo: BooksRepository = container.get(BooksRepository);
            const content = JSON.parse(req.body.info);

            const newBook: CreateBookDto = {
                title: content.title,
                description: content.description,
                authors: content.authors,
                favorite: content.favorite,
                fileCover: content.fileCover,
                fileName: content.fileName,
                fileBook: req.file.filename
            };

            res.json(await repo.create(newBook));
            res.status(201);
        } catch (e) {
            console.log(e);
            res.status(500);
            res.json('Code: 500');
        }
    });

router.put('/:id', async (req, res) => {
    const updContent = req.body;

    const content: UpdateBookDto = {
        title: updContent.title,
        description: updContent.description,
        authors: updContent.authors,
        favorite: updContent.favorite,
        fileCover: updContent.fileCover
    };
    const { id } = req.params;

    try {
        const repo: BooksRepository = container.get(BooksRepository);
        res.json(await repo.update(id, content));
    }
    catch (e) {
        res.status(404);
        res.json('Code: 404');
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const repo: BooksRepository = container.get(BooksRepository);
        const result = await repo.delete(id);
        if (result === false) throw new Error();
        res.json('ok');
    } catch (e) {
        res.status(404);
        res.json('Code: 404');
    }
});

router.get('/:id/download', async (req, res) => {
    const { id } = req.params;

    try {
        const repo: BooksRepository = container.get(BooksRepository);
        const book = await repo.getOne(id);
        res.download(path.join(BOOK_FOLDER, book.fileBook), book.fileName);
    } catch (e) {
        res.status(404);
        res.json('Code: 404');
    }
});

export default router;