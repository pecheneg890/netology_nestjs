
const express = require('express');
const container = require('../container');
const router = express.Router();
const { multer, BOOK_FOLDER } = require('../middleware/file');
const path = require('node:path');
const BooksRepository = require("../book-repository");


router.get('/', async (req, res) => {
    const repo = container.get(BooksRepository);
    res.json(await repo.getAll());
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const repo = container.get(BooksRepository);
        res.json(await repo.getOne(id));
    }
    catch (e) {
        res.status(404);
        res.json('Code: 404');
    }
});

router.post('/', multer.single('book'),
    async (req, res) => {
        try {
            const repo = container.get(BooksRepository);
            const newBook = {
                title,
                description,
                authors,
                favorite,
                fileCover,
                fileName
            } = JSON.parse(req.body.info);

            newBook.fileBook = req.file.filename;

            res.json(await repo.create(newBook));
            res.status(201);
        } catch (e) {
            console.log(e);
            res.status(500);
            res.json('Code: 500');
        }
    });

router.put('/:id', async (req, res) => {
    const content = { title,
        description,
        authors,
        favorite,
        fileCover,
        fileName } = req.body;
    const { id } = req.params;

    try {
        const repo = container.get(BooksRepository);
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
        const repo = container.get(BooksRepository);
        const result = await repo.delete(id);
        if (result === null) throw new Error();
        res.json('ok');
    } catch (e) {
        res.status(404);
        res.json('Code: 404');
    }
});

router.get('/:id/download', async (req, res) => {
    const { id } = req.params;

    try {
        const repo = container.get(BooksRepository);
        const book = await repol.getOne(id);
        res.download(path.join(BOOK_FOLDER, book.fileBook), book.fileName);
    } catch (e) {
        res.status(404);
        res.json('Code: 404');
    }
});

module.exports = router;