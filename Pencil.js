class Pencil {
    constructor( durability = 100 ) {
        this.page = ``;
        this.durability = durability;
    }

    write(text) {
        for (const char of text) {
            if (this.durability > 0) {
                if (char.match(/[A-Z]/)) {
                    if (this.durability >= 2) {
                        this.durability -= 2;
                        this.page += char;
                    }
                }
                else if (char.match(/\S/)) {
                    this.durability -= 1;
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
}

module.exports = Pencil;