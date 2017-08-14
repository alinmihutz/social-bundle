import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {SessionService} from "../../services/session.service";
import {User} from "../shared/user";
import {Token} from "../shared/token";

@Component({
    templateUrl: './app/components/login/login.component.html',
    styleUrls: ['./app/components/login/login.component.css']
})

export class LoginComponent implements OnInit {
    socialLoginInProgress = false;
    showLogin: boolean = false;
    showSocialLoginAndSignup: boolean = true;

    constructor(
        private authService: AuthService,
        private sessionService: SessionService,
        private router: Router
    ) {
    }

    loggedWith(app: string) {
        return this.sessionService.loggedWith(app);
    }

    initLogIn(): void {
        this.showLogin = true;
        this.showSocialLoginAndSignup = false;
    }

    initSignIn(): void {
        this.showLogin = false;
        this.showSocialLoginAndSignup = true;
    }

    socialLogin(provider: string): void {
        if (this.socialLoginInProgress) {
            console.log('socialLoginInProgress');
            return;
        }
        this.socialLoginInProgress = true;
        this.sessionService.addApp(provider);
        this.authService.getSocialLoginUrl(provider).then(authUrl => {
            this.socialLoginInProgress = false;
            if (null !== authUrl) {
                window.location.replace(authUrl);
                return;
            }
            this.router.navigate(['/login']);
        });
    }

    get authenticated(): boolean {
        return this.authService.isAuthenticated();
    }

    ngOnInit(): void {
        if (this.authenticated) {
            this.router.navigate(['/socialbundle']);
            return;
        }
        this.sessionService.clearSessionState();
    }

    login(event: any, credentials: Object) {
        this.sessionService.addApp('socialbundle');
        event.preventDefault();
        let response = this.authService.login(credentials);
        response.subscribe(
            data => this.loginSuccessWithRedirectCallback(data.json()),
            err => this.loginFailedCallback('Api error!'));
    }

    signIn(event: any, user: Object) {
        event.preventDefault();
        this.sessionService.addApp('socialbundle');
        let response = this.authService.signIn(user);
        response.subscribe(
            data => this.loginSuccessWithRedirectCallback(data.json()),
            err => this.loginFailedCallback('Api error!'));
    }

    loginSuccessWithRedirectCallback(data: any) {
        let users = [];
        let tokens = [];
        Object.keys(data.users).forEach(function (key) {
            let user = new User(data.users[key]);
            let token = new Token(data.users[key]['access_token'], user.getApp());
            users.push(user);
            tokens.push(token);
        });

        this.sessionService.setLoginId(data.id);
        this.sessionService.setUsers(users);
        this.sessionService.setTokens(tokens);

        this.router.navigate(['/socialbundle']);
    }

    loginFailedCallback(err: string) {
        console.log('[Err]Login: ' + err);
    }
}