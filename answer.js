const drevo = require('./drevo');


const root = drevo();
const website = "https://www.ivi.ru";  // платформа з фільмами

///////////////////////////////////////////////////////////////////////////////

// для однойменного наміру
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

    let elements = root[type][0][genre];
    let f_movie = elements[Math.floor(Math.random() * elements.length)];

    link = link + "/watch/" + f_movie;
    return link;
}

///////////////////////////////////////////////////////////////////////////////
// для однойменного наміру
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

///////////////////////////////////////////////////////////////////////////////
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


module.exports = {answer, movie_get, list_get}
