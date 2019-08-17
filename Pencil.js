class Pencil {
    constructor( durability = 100 ) {
        this.page = ``;
        [this.durability, this.initialDurability] = [durability, durability];
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
        this.durability = this.initialDurability;
    }
}

module.exports = Pencil;