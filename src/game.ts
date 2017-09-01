export class Game {

    name: string;
    password: string;

    constructor(name: string, password: string) {
        this.name = name;
        this.password = password;
    }

    getName() {
        return this.name;
    }
}
