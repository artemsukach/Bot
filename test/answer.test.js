const {answer, movie_get, list_get} = require('../answer');


const not_tru_answer = "Нічого не зрозумів(\nДавайте ще раз...";
const require_to_movie = {"genre:genre":[{"id":"1401375696903963","name":"genre","role":"genre","start":16,"end":23,"body":"вестерн","confidence":0.8636,"entities":[],"value":"western","type":"value"}]} ;
const require_to_list = {"genre:genre":[{"id":"1401375696903963","name":"genre","role":"genre","start":15,"end":24,"body":"бойовиків","confidence":0.9471,"entities":[],"value":"boeviki","type":"value"}]} ;

test('example of an incorrect query', () => {
    expect( answer('NEkorektno')).toBe(not_tru_answer);
})

describe('function movie_get processing', () => {
    test('example of an incorrect result', () => {
        expect( movie_get(require_to_list)).not.toBe('https://www.ivi.ru/movies/western');
        expect( movie_get(require_to_list)).toContain('https://www.ivi.ru');

    });
    test('example of a correct result', () => {
        expect( movie_get(require_to_movie)).not.toBe('https://www.ivi.ru/movies/boeviki');
        expect( movie_get(require_to_movie)).toContain('https://www.ivi.ru');

    });
});

describe('function list_get processing', () => {
    test('example of an incorrect result', () => {
        expect( list_get(require_to_movie)).toBe('https://www.ivi.ru/movies/western');
        expect( list_get(require_to_movie)).toContain('western')

    });
    test('example of a correct result', () => {
        expect( list_get(require_to_list)).toBe('https://www.ivi.ru/movies/boeviki');
        expect( list_get(require_to_list)).toContain('boeviki')

    });
});
