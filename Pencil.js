class Pencil {
    constructor(pointDurability = 100, length = 7, eraserDurability = 50) {
      this.page = ``;
      [this.pointDurability, this.initialDurability] = [pointDurability, pointDurability];
      this.length = length;
      this.eraserDurability = eraserDurability;
      this.erasureIndices = [];
    }
  
    write(text) {
      const writeCharToPage = (char) => {
        this.page += char;
      };
  
      const writeSpaceToPage = () => {
        this.page += ' ';
      };
  
      for (const char of text) {
        const charValue = valueOfCharacter(char);
  
        if (this.pointDurability > 0) {
          if (charValue === 2) {
            this.pointDurability -= charValue;
            if (this.pointDurability >= 2) {
              writeCharToPage(char);
            } else {
              writeSpaceToPage();
            }
          } else if (charValue === 1) {
            this.pointDurability -= charValue;
            writeCharToPage(char);
          } else {
            writeCharToPage(char);
          }
        } else {
          writeSpaceToPage();
        }
      }
    }
  
    sharpen() {
      if (this.length > 0) {
        this.pointDurability = this.initialDurability;
        this.length -= 1;
      }
    }
  
    erase(text) {
      if (this.page.includes(text) && this.eraserDurability > 0) {
        const wordLength = text.length;
        const numCharsToErase = Math.min(wordLength, this.eraserDurability);
        const replacementText =
          text.slice(0, wordLength - numCharsToErase) + ' '.repeat(numCharsToErase);
        const lastOccurenceOfText = this.page.lastIndexOf(text);
  
        const newTrailingEnd = this.page.slice(lastOccurenceOfText).replace(text, replacementText);
  
        this.page = this.page.slice(0, lastOccurenceOfText) + newTrailingEnd;
  
        this.eraserDurability -= numCharsToErase;
        this.erasureIndices.push(lastOccurenceOfText);
      }
    }
  
    edit(textToInsert) {
      const writeEdit = () => {
        const lastErasureIndex = this.erasureIndices[this.erasureIndices.length - 1];
        let editedText = '';
  
        for (let i = 0; i < textToInsert.length; ++i) {
          if (this.pointDurability <= 0) {
            break;
          }
  
          if (
            i + lastErasureIndex < this.page.length &&
            isNotWhitespace(this.page[i + lastErasureIndex])
          ) {
            editedText += '@';
            this.pointDurability -= 1;
          } else {
            const charValue = valueOfCharacter(textToInsert[i]);
            if (this.pointDurability >= charValue) {
              editedText += textToInsert[i];
              this.pointDurability -= charValue;
            } else {
              break;
            }
          }
        }
        const newPageSection = this.page.slice(0, lastErasureIndex) + editedText;
        return newPageSection + this.page.slice(newPageSection.length);
      };
  
      if (this.erasureIndices.length !== 0 && this.pointDurability > 0) {
        this.page = writeEdit();
        this.erasureIndices.pop();
      }
    }
  }
  
  function valueOfCharacter(char) {
    if (isACapitalLetter(char)) {
      return 2;
    } else if (isNotWhitespace(char)) {
      return 1;
    }
    return 0;
  }
  
  function isACapitalLetter(char) {
    return char.match(/[A-Z]/);
  }
  
  function isNotWhitespace(char) {
    return char.match(/\S/);
  }
  
  module.exports = Pencil;
  