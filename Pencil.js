class Pencil {
    constructor( durability = 100, length = 7 ) {
        this.page = ``;
        [this.durability, this.initialDurability] = [durability, durability];
        this.length = length;
    }

    write(text) {
        for (const char of text) {
            const charValue = valueOfCharacter(char);

            if (this.durability > 0) {
                if (charValue === 2) {
                    this.durability -= charValue;
                    if (this.durability >= 2) {
                        this.page += char;
                    }
                    else {
                        this.page += ' '
                    }
                }
                else if (charValue === 1) {
                    this.durability -= charValue;
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
            this.durability = this.initialDurability;
            this.length -= 1;
        }
    }
}

module.exports = Pencil;