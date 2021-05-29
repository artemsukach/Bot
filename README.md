# Курсовий проект з дисципліни "Інженерія ПЗ"
# Тема проекту: "Телеграм-бот з використанням платформи wit.ai"
## Що таке wit.ai?
[wit.ai](https://wit.ai) - це платформа Facebook'а для обробки нативной мови для створення ботів зі штучним інтелектом, яка приймає на вхід текстову або голосову фразу "природною" мовою і пробує відповісти за допомогою нейромережі.
## Яка тематика бота?
Назва бота: КіноГід.

Його основним завданням є: допомога користувачу при виборі фільму з урахуванням його вподобань.
## Функціонал
- вмикання відповідного фільма, якщо користувач вказав чітку назву.
- рекомендування до перегляду фільма вибраного випадковим чином.
- список відповідно до жанру та його сортування за декількома критеріями.
- команди допомоги та зворотнього зв'язку
## Як це працює?
1. Користувач "природньою" мовою у текстовому або голосовому вигляді передає фразу до телеграм-бота.
2. Дана фраза передається до wit.ai.
3. Сервіс обробляє її та передає у відповідь інформацію у JSON-форматі.
4. Обробник подій виділяє для себе основну інформацію (наприклад намір та сутність), і з її допомогою генерує відповідь користувачу.

### Переглянути jsdoc документацію коду можна за допомогою команди ```npm run doc```
## Пояснювальна записка знаходиться [тут](https://github.com/artemsukach/master/Bot/doc/description.md)
### Виконали:
**Сукач Артем ІО-93**<br/>
**Вігор Дмитро ІВ-91**
