export class App {
    public name: string = null;

    constructor(name: string) {
        this.name = name;
    }

    serialize() {
        return JSON.stringify({
            name: this.name
        })
    }

    getName() {
        return this.name ? this.name : null;
    }
}