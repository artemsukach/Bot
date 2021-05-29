const validator = require('../bot');


describe('function validation users message', () => {
    test('example of an incorrect query', () => {
        expect( validator('NEkorektnyi_zapyt')).toBeFalsy();
    
    });
    test('example of a correct query', () => {
        expect( validator('Коректний запит')).toBeTruthy();

    });
});
