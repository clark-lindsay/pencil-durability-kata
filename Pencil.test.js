const Pencil = require('./Pencil');

describe('Pencil', () => {
    test('it can write a single word', () => {
        pencil = new Pencil();
        pencil.write('fudge');

        expect(pencil.page).toEqual('fudge');
    });
});