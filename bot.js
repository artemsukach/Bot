const {answer} = require('./answer');
const TelegramBot = require('node-telegram-bot-api');
const {Wit, log} = require('node-wit');



// включаем Бота TELEGRAM
const TG_TOKEN = '';
const bot = new TelegramBot(TG_TOKEN, {polling: true});

// з'єднання по токену з ботом WIT
const WIT_TOKEN = ''  // робочий токен
const client = new Wit({
    accessToken: WIT_TOKEN,
    logger: new log.Logger(log.DEBUG)
});

///////////////////////////////////////////////////////////////////////////////

// start
bot.onText(/\/start(.*)/, (msg, [source, match]) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Хелоу ♂боді♂ \nЩо хочеш подивитись?');
});

// example
bot.onText(/\/example(.*)/, (msg, [source, match]) => {
    const chatId = msg.chat.id;
    const example = './images/example.mp4';

    bot.sendMessage(chatId, 'Ось приклади можливих запитів:');
    bot.sendVideo(chatId, example);
});

// help
bot.onText(/\/help(.*)/, (msg, [source, match]) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Чим же я тобі допоможу, ♂хлопче♂?');
});

// warning
bot.onText(/\/warning(.*)/, (msg, [source, match]) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Йой, проблемка :(');
    setTimeout(() =>
        bot.sendMessage(chatId, 'Надішліть скріншот чату та опис проблеми ось сюди: \n♂@Bitchach♂ or ♂@capVig♂'),
    1000);
});

// валідатор
const validator = function(user_text) {
    if (! /[^а-яА-ЯЁё-і0-9_,.!?"' -]/g.test(user_text) && user_text.length <= 100) {
        return true;
    } else {
        return false;
    }
}

// обработчик події надсилання будь-якого повідомлення
bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    // валідація отриманого повідомлення
    if (validator(msg.text)) {

    // отправляем сообщение на бот WIT
    client.message(msg.text, {})
    .then((data) => {
        const response = JSON.parse(JSON.stringify(data));
        const ans = answer(response);  // тут аналіз запиту

        bot.sendMessage(chatId, ans);  // відправка резалту
    })
    .catch(console.error);

  } else {
      if (! /^\//g.test(msg.text)) {  // перевірка на слеш
        let stiker_id = 'CAACAgIAAxkBAAECVtxgrTE0RQnpZLMpn3LMzr6p-jtapgACXAEAAhAabSKcIs6F61GChR8E';
        let tekst = "Я ще навчаюсь, тому інколи погано розумію вас.\nСпробуйте написати по-іншому.\n\n(Творці казали, що в наступному патчі виправлять це😉)";

        bot.sendSticker(chatId, stiker_id);
        setTimeout(() =>
            bot.sendMessage(chatId, tekst),
        1000);
      }
  }
});


module.exports = validator;
