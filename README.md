# Мессенджер

<p align="center">
    	<img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white">
    	<img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB">
			<img src="https://img.shields.io/badge/Handlebars.js-f0772b?style=for-the-badge&logo=handlebarsdotjs&logoColor=black">
    	<img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
    	<img src="https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white">
    	<img src="https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black">
</p>

---

1 модуль курса Мидл фронтенд-разработчик от Яндекс.Практикумна (спринты 1-4).

Когорта № 27.

---

## Ссылки

[Демо](https://sweet-creponne-8f0591.netlify.app/)

[Дизайн макет](https://www.figma.com/file/oWnGvihu5zIWH6bcyCEYX3/Messenger?node-id=0%3A1&t=L1ceXmvc2UrByKWX-1)

---

## Сборка, команды

Установка зависимостей:

`npm i`

# Команды:

Запуск PRODUCTION сервера

`npm run start`

Запуск DEV сервера

`npm run serve`

Запуск сборки проекта

`npm run build`

Запуск линтеров (eslint, stylelint)

`npm run lint`

`npm run stylelint`

Запуск тестов:

`npm run test`

### [Sprint 1](https://github.com/40thz/middle.messenger.praktikum.yandex/tree/sprint_1)

### [Pull request #1](https://github.com/40thz/middle.messenger.praktikum.yandex/pull/5)

### [Pull request #2](https://github.com/40thz/middle.messenger.praktikum.yandex/pull/6)

- Подклюение dev зависимостей

  - Parcel
  - Handlebars pre-compile
  - SASS

- Верстка
  - Страница регистрации
  - Страница авторизации
  - Страница чатов
  - Страница профиля
  - Модальные окна

### [Sprint 2](https://github.com/40thz/middle.messenger.praktikum.yandex/tree/sprint_2)

### [Pull request](https://github.com/40thz/middle.messenger.praktikum.yandex/pull/7)

- Внедрение typescript
- Реализация компонентов
  - EventBus
  - Базовый класс компонента с наследованием от EventBus'a
- Валидация форм (focus, blur)
- Отправка данных по заполнению формы
- Внедрение линтеров
  - ESLint
  - StyleLint

---

### [Sprint 3](https://github.com/40thz/middle.messenger.praktikum.yandex/tree/sprint_3)

### [Pull request](https://github.com/40thz/middle.messenger.praktikum.yandex/pull/8)

- Реализация кастомного fetch'a
- Реализация сервисов/контроллеров
- Внедрение websocket api
- Внедрение routing'a
- Регистрация/авторизация/выход
- Чат
  - Создание чата
  - Удаление чата
  - Отправка сообщения
  - Удаление/добавление пользователя из чата
  - Возможносить изменять првевью-изображение
- Профиль
  - Изменение всех данных о пользовтеле
  - Возможность изменять пароль
  - Возможность изменять првевью-изображение

---

### [Sprint 4](https://github.com/40thz/middle.messenger.praktikum.yandex/tree/sprint_4)

### [Pull request](https://github.com/40thz/middle.messenger.praktikum.yandex/pull/9)

- Переезд на webpack
- Внедрение тестов
  - Mocha
  - Chai
- Внедрение Docker'a
- Настройка pre-commit с помощью husky
