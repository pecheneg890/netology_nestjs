const express = require("express");
const characterRouter = require('./routes/character');
const mongoose = require('mongoose');
const serverless = require('serverless-http');
require('dotenv').config();

const app = express();
const port = 3000;
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/api', characterRouter);

const options = {};

//расположение SSL сертификата для подключения к mongo
if (process.env.CA_CRT) {
    options.tls = true;
    options.tlsCAFile = process.env.CA_CRT;
}

//подключение к БД
mongoose.connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    options)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

//serverless
module.exports.handler = serverless(app);

//локальный запуск
/*app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});*/