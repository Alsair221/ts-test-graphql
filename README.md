
## Описание проекта

Это проект тестового задания на TypeScript + GraphQL. Проект включает докер-контейнер, который поднимает БД и небольшое API для получения профилей пользователей с их проектами, опытом работы, скилами.

## Используемый стэк

TypeScript, NestJS, GraphQL, Prisma, PostgreSQL, Docker

## Установка

```bash
$ npm install
```

## Запуск проекта

```bash
docker-compose up --build
```

после этого проект будет доступен по ссылке http://localhost:3000/graphql

## Примеры запросов 

все профили
```bash
{
    profiles {
        name
        slug
    }
}
```

получение конкретного профиля
```bash
{
    profile(slug: "alexandr_semenov") {
        name
        slug
        description
        github
        linkedin
        skills {
            skill { name }
            level
        }
        experience {
            dateStart
            dateEnd
            company { name }
        }
        projects {
            name
            slug
            link
        }
    }
}
```

## Мутации
В проекте используется авторизация с JWT токенами.

```
# регистрация нового пользователя (создаётся без привязанного профиля)
# ограничения: email - должен быть валилен, пароль - минимум 8 символов (латиница + цифры) 
mutation{
  register(input: {email: "111@111.ru", password: "qwer1234"}){
    token
  }
}

# авторизация пользователя
mutation{
  login(input: {email: "111@111.ru", password: "qwer1234"}){
    token
  }
}
```

полученный токен кладётся в Headers
```
{
    "Authorization": "Bearer #TOKEN#"
}
```

с таким заголовком можно выполнять защищённые мутации. Из токена берётся пользователь, и работа происходит именно с этм пользователем.
```
# ограничения: name - минимум 2 символа, slug - только латиница и цифры (опционален, если не передан - генерируется из name)
mutation{
  editProfile(input: {name: "111", slug: "1gfjdjdgdfgj"}){
    id
    name
  }
}
```

## Валидация ошибок
```
{
  "message": "Ошибка валидации",
  "extensions": {
    "code": "BAD_REQUEST",
    "fields": [
      { "field": "email", "messages": ["email must be an email"] }
    ]
  }
}
```

Автор - [Семенов Александр]