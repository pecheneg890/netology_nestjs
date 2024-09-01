## Запуск
```
docker-compose up 
```

## Папки с данными
```
book_storage - хранилище файлов
mongodb/db - файлы базы данных
```

## Использование
Метод|URL | Действие | Комментарий
--- | --- | ---  | ---
`POST`|`localhost:8080/api/user/login`|авторизация пользователя||
`GET`|`localhost:8080/api/books`|получить все книги||
`GET`|`localhost:8080/api/books/:id`|получить книгу по ID||
`POST`|`localhost:8080/api/books`|создать книгу|`Content-type multipart/form-data; поле info - JSON с информацией о книге; поле  book - файл с книгой`|
`PUT`|`localhost:8080/api/books/:id`|редактировать книгу по ID||
`DELETE`|`localhost:8080/api/books/:id`|удалить книгу по ID||
`GET`|`localhost:8080/api/books/:id/download`|скачать книгу по ID||

## InversifyJS
```
Класс который помещаем в контейнер - BooksRepository
Создание контейнера - container.js
Использование контейнера - routes/books.js
```