class Pencil {
    constructor( pointDurability = 100, length = 7 ) {
        this.page = ``;
        [this.pointDurability, this.initialDurability] = [pointDurability, pointDurability];
        this.length = length;
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
    }

    sharpen() {
        if (this.length > 0) {
            this.pointDurability = this.initialDurability;
            this.length -= 1;
        }
    }

    erase(text) {
       if (this.page.includes(text)) {
           const wordLength = text.length; 
           const lastOccurenceOfText = this.page.lastIndexOf(text);

           const newTrailingEnd = this.page.slice(lastOccurenceOfText).replace(text, ' '.repeat(wordLength));
           this.page = this.page.slice(0, lastOccurenceOfText) + newTrailingEnd;
       }
    }
}

module.exports = Pencil;