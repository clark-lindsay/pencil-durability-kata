class Pencil {
    constructor() {
        this.page = ``;
    }

    write(text) {
        this.page += text;
    }
}

module.exports = Pencil;