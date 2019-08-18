class Pencil {
    constructor( pointDurability = 100, length = 7, eraserDurability = 50 ) {
        this.page = ``;
        [this.pointDurability, this.initialDurability] = [pointDurability, pointDurability];
        this.length = length;
        this.eraserDurability = eraserDurability;
        this.erasureIndices = [];
    }

    write(text) {
        for (const char of text) {
            const charValue = valueOfCharacter(char);

            if (this.pointDurability > 0) {
                if (charValue === 2) {
                    this.pointDurability -= charValue;
                    if (this.pointDurability >= 2) {
                        this.page += char;
                    }
                    else {
                        this.page += ' '
                    }
                }
                else if (charValue === 1) {
                    this.pointDurability -= charValue;
                    this.page += char;
                }
                else {
                    this.page += char;
                }
            }
            else {
                this.page += ' ';
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
           const replacementText = text.slice(0, wordLength - numCharsToErase) + ' '.repeat(numCharsToErase);
           const lastOccurenceOfText = this.page.lastIndexOf(text);

           const newTrailingEnd = this.page.slice(lastOccurenceOfText).replace(text, replacementText);

           this.page = this.page.slice(0, lastOccurenceOfText) + newTrailingEnd;

           this.eraserDurability -= numCharsToErase;
           this.erasureIndices.push(lastOccurenceOfText);
       }
    }

    edit(textToInsert) {
        const lastErasureIndex = this.erasureIndices[this.erasureIndices.length - 1];
        const writeEdit = () => {
            let editedText = '';
            for (let i = 0; i < textToInsert.length; ++i) {
                if (this.pointDurability <= 0) {
                    break;
                }

                if ((i + lastErasureIndex) < this.page.length && this.page[i + lastErasureIndex].match(/\S/)) {
                    editedText += '@';
                    this.pointDurability -= 1;
                }
                else {
                    const charValue = valueOfCharacter(textToInsert[i]);
                    if (this.pointDurability >= charValue) {
                        editedText += textToInsert[i];
                        this.pointDurability -= charValue;
                    }
                    else {
                        break;
                    }
                }
            }
            return editedText;
        }

        if (this.erasureIndices.length !== 0 && this.pointDurability > 0) {
            const newPageSection = this.page.slice(0, lastErasureIndex) + writeEdit();
            
            this.page = newPageSection + this.page.slice(newPageSection.length);
            this.erasureIndices.pop();
        }
    }
}

function valueOfCharacter(char) {
    if (char.match(/[A-Z]/)) {
        return 2;
    }
    else if (char.match(/\S/)) {
        return 1;
    }
    else {
        return 0;
    }
}

module.exports = Pencil;