
## Описание проекта

Это проект тестового задания на TypeScript + GraphQl. Проект включает докер-контейнер, который поднимает БД и небольшое API для получения профилей пользователей с их проектами, опытом работы, скилами.

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

Автор - [Семенов Александр]