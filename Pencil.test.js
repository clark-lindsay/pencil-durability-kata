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
    secondPencil.write('   \nspaces');

    expect(pencil.page).toEqual('Tex ');
    expect(secondPencil.page).toEqual('   \nspace ');
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
    expect(secondPencil.pointDurability).toEqual(40000);
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

    pencil.sharpen();
    expect(pencil.pointDurability).toEqual(0);
  });

  test('it can erase previously written text', () => {
    pencil = new Pencil();
    pencil.write('How much wood would a woodchuck chuck if a woodchuck could chuck wood');
    pencil.erase('chuck');

    expect(pencil.page).toEqual(
      'How much wood would a woodchuck chuck if a woodchuck could       wood',
    );

    pencil.erase('chuck');

    expect(pencil.page).toEqual(
      'How much wood would a woodchuck chuck if a wood      could       wood',
    );
  });

  test('it will not erase something that is not there', () => {
    pencil = new Pencil();
    pencil.write('Some normal words');
    pencil.erase('chuck');

    expect(pencil.page).toEqual('Some normal words');

    pencil.erase('mornal');
    pencil.erase('normale');

    expect(pencil.page).toEqual('Some normal words');
  });

  test('it will do nothing when erase is called when nothing has yet been written', () => {
    pencil = new Pencil();
    pencil.erase('chuck');

    expect(pencil.page).toEqual('');
  });

  test('it will eventually run out of eraser, and it erases the most recently written text first', () => {
    pencil = new Pencil(100, 7, 3);
    pencil.write('Buffalo Bill');
    pencil.erase('Bill');

    expect(pencil.page).toEqual('Buffalo B   ');

    pencil.erase('Buffalo');

    expect(pencil.page).toEqual('Buffalo B   ');
  });

  test('it can edit existing text, provided that some text has been erased', () => {
    pencil = new Pencil();
    pencil.write('An apple a day keeps the doctor away');
    pencil.erase('apple');
    pencil.edit('onion');

    expect(pencil.page).toEqual('An onion a day keeps the doctor away');
  });

  test('it will use the @ character to mark overlap when editing text', () => {
    pencil = new Pencil();
    pencil.write('An apple a day keeps the doctor away');
    pencil.erase('apple');
    pencil.edit('artichoke');

    expect(pencil.page).toEqual('An artich@k@ay keeps the doctor away');
  });

  test('it will stop writing or overwriting text if it is out of point durability during an edit', () => {
    pencil = new Pencil(34);
    pencil.write('An apple a day keeps the doctor away');
    pencil.erase('apple');
    pencil.edit('artichoke');

    expect(pencil.page).toEqual('An arti  a day keeps the doctor away');
  });

  test('it will not make an edit when there have been no erasures', () => {
    pencil = new Pencil();
    pencil.write('An apple a day keeps the doctor away');
    pencil.edit('artichoke');

    expect(pencil.page).toEqual('An apple a day keeps the doctor away');
  });

  test('it will add words to the end of the page for an edit, if the last erasure was the last word on the page', () => {
    pencil = new Pencil();
    pencil.write('An apple a day keeps the doctor away');
    pencil.erase('away');
    pencil.edit('artichoke');

    expect(pencil.page).toEqual('An apple a day keeps the doctor artichoke');
  });

  test('will not make an edit if the number of edit requests is more than the number of erasures', () => {
    pencil = new Pencil();
    pencil.write('An apple a day keeps the doctor away');
    pencil.erase('apple');
    pencil.edit('artichoke');
    pencil.edit('onion');

    expect(pencil.page).toEqual('An artich@k@ay keeps the doctor away');
  });
});
