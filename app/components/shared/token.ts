export class Token {
    public id: string = null;
    public app: string = null;

    constructor(token: string, app: string) {
        this.id = token;
        this.app = app;
    }

    serialize() {
        return JSON.stringify({
            id: this.id,
            all: this.app
        });
    }

    getId() {
        return this.id;
    }

    getApp(): string {
        return this.app;
    }
}