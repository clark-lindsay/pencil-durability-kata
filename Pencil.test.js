const Pencil = require('./Pencil');

describe('Pencil', () => {
    test('it can write a single word', () => {
        pencil = new Pencil();
        pencil.write('fudge');

        expect(pencil.page).toEqual('fudge');
    });

    test('when writing more than once, subsequent writes are appended to the existing text', () => {
        pencil = new Pencil();
        pencil.write('She sells sea shells');
        pencil.write(' down by the sea shore');

        expect(pencil.page).toEqual('She sells sea shells down by the sea shore');
    });
});