## Настройка
Для настройки необходимо создать файл .env, для примера смотреть .env.example

## Решение задания
```
Клиентская часть для ввода и просмотра комментариев доступна по ссылке 
http://localhost:3000/static/index.html

Серверная часть:
books.gateway.ts - gateway для web socket
book-comment.service.ts - сервис по работе с комментариями
book-comment.schema.ts - схема для хранения комментариев в mongo
```

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

