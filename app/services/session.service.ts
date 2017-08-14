import {Injectable} from '@angular/core';

import {App} from "../components/shared/app";
import {User} from "../components/shared/user";
import {Token} from "../components/shared/token";

@Injectable()
export class SessionService {
    loginId: string = null;
    app: App = null;
    tokens: any = null;
    users: any = null;

    constructor() {
        if (localStorage.getItem('session.login-id')) {
            this.loginId = localStorage.getItem('session.login-id');
        }

        if (localStorage.getItem('session.app.last-login-provider')) {
            let app = JSON.parse(localStorage.getItem('session.app.last-login-provider'));
            this.app = new App(app.name);
        }

        if (localStorage.getItem('session.access.tokens')) {
            this.loadTokens(JSON.parse(localStorage.getItem('session.access.tokens')));
        }

        if (localStorage.getItem('session.app.users')) {
            this.loadUsers(JSON.parse(localStorage.getItem('session.app.users')));
        }

        console.log(this);
    }

    loggedWith(app: string): boolean {
        return (null !== this.getUsersByApp(app));
    }

    addApp(name: string): void {
        let app = new App(name);
        this.app = app;
        localStorage.setItem('session.app.last-login-provider', app.serialize());
    }

    private loadUsers(userData: Object): void {
        let usersObj = {
            'facebook': [],
            'instagram': [],
            'twitter': [],
            'google': [],
            'socialbundle': []
        };

        for (let app in userData) {
            if (userData[app].length > 0) {
                let usersArr = [];
                for (let i in userData[app]) {
                    let obj = new User(userData[app][i]);
                    usersArr.push(obj);
                }
                usersObj[app] = usersArr;
            }
        }

        this.users = usersObj;
    }

    private loadTokens(tokens: Object): void {
        let tokensObj = {
            'facebook': [],
            'instagram': [],
            'twitter': [],
            'google': [],
            'socialbundle': []
        };

        for (let app in tokens) {
            if (tokens[app].length > 0) {
                let appTokens = [];
                for (let i in tokens[app]) {
                    let obj = new Token(tokens[app][i]['id'], app);
                    appTokens.push(obj);
                }
                tokensObj[app] = appTokens;
            }
        }

        this.tokens = tokensObj;
    }

    getLoginId() {
        return this.loginId;
    }

    getAppName(): string {
        return this.app.getName();
    }

    getApps() {
        return ['facebook','google','twitter','instagram', 'socialbundle'];
    }

    getTokensByApp(app: string): Token[] {
        for (let i in this.tokens) {
            if (i == app && 'undefined' !== typeof this.tokens[i] && this.tokens[i].length > 0) {
                return this.tokens[i];
            }
        }
        return null;
    }

    getTokens() {
        return this.tokens;
    }

    getUsersByApp(app: string): User {
        for (let i in this.users) {
            if (i == app && 'undefined' !== typeof this.users[i] && this.users[i].length > 0) {
                return this.users[i];
            }
        }
        return null;
    }

    getUserByAppAndToken(app:string, token:string): User {
        let users = this.getUsersByApp(app);
        if (null !== users) {
            for (let i in users) {
                if (users[i] instanceof User && users[i].getAccessToken() == token) {
                    return users[i];
                }
            }
        }

        return null;
    }

    getUsers() {
        return this.users;
    }

    setLoginId(loginId: string) {
        this.loginId = loginId;
        localStorage.setItem('session.login-id', loginId);
    }

    setTokens(tokens:any) {
        let tokensObj = {
            'facebook': [],
            'instagram': [],
            'twitter': [],
            'google': [],
            'socialbundle': []
        };

        for (let i in tokens) {
            let token = tokens[i];
            tokensObj[token.getApp()].push(token);
        }

        this.tokens = tokensObj;
        localStorage.setItem('session.access.tokens', JSON.stringify(this.tokens));
    }

    setUsers(users:any) {
        let usersObj = {
            'facebook': [],
            'instagram': [],
            'twitter': [],
            'google': [],
            'socialbundle': []
        };

        for (let i in users) {
            let user = users[i];
            usersObj[user.getApp()].push(user);
        }

        this.users = usersObj;
        localStorage.setItem('session.app.users', JSON.stringify(this.users));
    }

    clearSessionState(): void {
        this.loginId = null;
        this.app = null;
        this.users = null;
        this.tokens = null;

        localStorage.removeItem('session.login-id');
        localStorage.removeItem('session.app.users');
        localStorage.removeItem('session.access.tokens');
        localStorage.removeItem('session.app.last-login-provider');
    }

    destroy(): void {
        this.clearSessionState();
    }
}