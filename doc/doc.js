/**
* Включаємо бота телеграм
*/
const bot = new TelegramBot(TG_TOKEN, {polling: true});

/**
* Підключаємо wit
*/
const client = new Wit({
  accessToken: WIT_TOKEN,
  logger: new log.Logger(log.DEBUG) // optional
});

/**
* Перевірка на валідність данних отриманих від користувача
* @param {string} user_text
* @return {boolean}
* @example
*
* function('sdfsfjsf12323///a1/§')
* // => false
*
* function('Порекомендуй фільм')
* // => true
*/
const validator = function(user_text) {
    if (! /[^а-яА-ЯЁё-і0-9_,.!?"' -]/g.test(user_text) && user_text.length <= 100) {
      return true;
    } else {
      return false;
    }
  }

/**
* Функція для обробки однойменного наміру
* @param {dict} info Отримана відповідь від wit.ai
* @return {string} Повертає силку
* @example
*
* function movie_get(info)
* // => 'https://www.ivi.ru/watch/202232'
*
* function movie_get(info)
* // => 'https://www.ivi.ru/watch/131251'
*/
function movie_get(info) {
  let link = website;

  if (info['name:name']) {
    let strocka = info['name:name'][0]['body'];
    let re = / /g;
    let to_link = strocka.replace(re, '%20');  // міняємо пробіли на код

    link = link + '/search/?q=' + to_link;
    return link;
  }

  let type = 'movies';  // по умолчанію - фільми
  let genre = 'horror';  // по умолчанію - хорори

  if (info['type:type']) {
    type =  info['type:type'][0]['value'];
  }

  if (info['genre:genre']) {
    genre = info['genre:genre'][0]['value'];
  }

  let elements = drevo[type][0][genre];
  let fucking_movie = elements[Math.floor(Math.random()*elements.length)];

  link = link + "/watch/" + fucking_movie;
  return link;
}

/**
* Функція для обробки однойменного наміру
* @param {dict} info Отримана відповідь від wit.ai
* @return {string} Повертає силку
* @example
*
* function list_get(info)
* // => 'https://www.ivi.ru/movies/boeviki'
*
* function list_get(info)
* // => 'https://www.ivi.ru/series/boeviki?sort=imdb'
*/

function list_get(info) {
  let link = website;

  if (info['name:name']) {
    let strocka = info['name:name'][0]['body'];
    let re = / /g;
    let to_link = strocka.replace(re, '%20');

    link = link + '/search/?q=' + to_link;
    return link;  // і одразу віддаємо відповідь
  }

  if (info['type:type']) {
    link = link + "/" + info['type:type'][0]['value'];
  } else {
    link += '/movies';
  }

  if (info['genre:genre']) {
    link = link + "/" + info['genre:genre'][0]['value'];
  }

  if (info['sort:sort']) {
    link = link + "?sort=" + info['sort:sort'][0]['value'];
  }

  return link;
}

/**
* Функція для обробки результату отриманого від wit.ai
* @param {dict} user_text Отримана відповідь від wit.ai
* @return {string} Повертає силку
* @example
*
* function answer(user_text)
* // => "Нічого не зрозумів(
* //     Давайте ще раз..."
*/
function answer(user_text) {
    let answer, get_name;
    try {
        get_name = user_text['intents'][0]['name'];
    }
    catch (e) {
        answer = "Нічого не зрозумів(\nДавайте ще раз...";
    }

    // переробити нормально без розгалудження під якись `this.`
    if (movie_get.name == get_name) {

        answer = movie_get(user_text['entities']);

    } else if (list_get.name == get_name) {

        answer = list_get(user_text['entities']);

    }
    return answer;
}
