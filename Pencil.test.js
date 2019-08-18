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

    test('it will write a space if tasked to write a capital when it has only one durability left', () => {
        pencil = new Pencil(4);
        pencil.write('TnT is dynamite');
        
        expect(pencil.page).toEqual('Tn             ');
    });

    test('it can be sharpened to regain durability', () => {
        pencil = new Pencil(4);
        pencil.write('Text');
        pencil.sharpen();
        pencil.write('word');

        secondPencil = new Pencil(40000);
        secondPencil.write('A somewhat long sentence');
        secondPencil.sharpen();

        expect(pencil.page).toEqual('Tex word');
        expect(secondPencil.durability).toEqual(40000);
    });

    test('if it runs out of length, it cannot regain durability', () => {
        pencil = new Pencil(4, 2);
        pencil.write('word');
        pencil.sharpen();
        pencil.write('word');
        pencil.sharpen();
        pencil.write('word');
        pencil.sharpen();
        pencil.write('word');

        expect(pencil.page).toEqual('wordwordword    ');
    });

    test('it can erase previously written text', () => {
        pencil = new Pencil();
        pencil.write('How much wood would a woodchuck chuck if a woodchuck could chuck wood');
        pencil.erase('chuck');

        expect(pencil.page).toEqual('How much wood would a woodchuck chuck if a woodchuck could       wood')

        pencil.erase('chuck');

        expect(pencil.page).toEqual('How much wood would a woodchuck chuck if a wood      could       wood')
    });
});