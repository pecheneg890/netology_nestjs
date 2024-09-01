const express = require('express');
const booksRouter = require('./routes/books');
const userRouter = require('./routes/user');
const error404 = require('./middleware/err-404');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

app.use('/api/books', booksRouter);
app.use('/api/user', userRouter);
app.use(error404);

const PORT = process.env.PORT || 3000;
start();

async function start() {
    try {
        await mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@mongo:27017/book`);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}
