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

    test('after writing too many non-whitespace characters, the pencil only produces space characters', () => {
        pencil = new Pencil(4);
        pencil.write('Text');
        
        secondPencil = new Pencil(5);
        secondPencil.write('   spaces')

        expect(pencil.page).toEqual('Tex ');
        expect(secondPencil.page).toEqual('   space ');
    });

    test('a pencil can be sharpened to regain durability', () => {
        pencil = new Pencil(4);
        pencil.write('Text');
        pencil.sharpen();
        pencil.write('word');

        expect(pencil.page).toEqual('Tex word');
    });
});