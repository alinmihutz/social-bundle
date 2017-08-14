import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OAuthService} from "../services/oauth.service";
import {SessionService} from "../services/session.service";
import {User} from "./shared/user";
import {Token} from "./shared/token";

@Component({
    template: '<div class="sb-loading sb-center"><img src="../app/statics/img/ring-loader.gif"/></div>',
})
export class OAuthComponent implements OnInit {
    private loginId: string = null;
    private authCode: string = null;
    private accessToken: string = null;
    private accessCode = null;
    private accessCodeSecret: string = null;
    private authApp: string = null;

    constructor(
        private OAuthService: OAuthService,
        private sessionService: SessionService,
        private router: Router
    ) {
        this.loginId = this.sessionService.getLoginId();
        this.authApp = this.sessionService.getAppName();
        this.authCode = this.oauthGetRouteParamsByName('code');
        this.accessToken = this.oauthGetRouteParamsByName('oauth_token');
        this.accessCode = (null !== this.accessToken) ? this.accessToken : this.authCode;
        this.accessCodeSecret = this.oauthGetRouteParamsByName('oauth_verifier');

        if (null === this.accessCode) {
            console.log('missing access token');
            this.router.navigate(['/login']);
        }
    }

    private executeOAuth() {
        let response = this.OAuthService.oauth(
            this.authApp,
            this.accessCode,
            this.accessCodeSecret,
            this.loginId
        );

        response.subscribe(
            data => this.oauthSuccessCallback(data.json()),
            err => this.oauthFailedCallback()
        );
    }

    private oauthSuccessCallback(data: any) {
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

    private oauthFailedCallback() {
        console.log('executeOAuth failed callback');
        this.router.navigate(['/login']);
    }

    ngOnInit(): void {
        this.executeOAuth();
    }

    private oauthGetRouteParamsByName(variable: string) {
        let query = decodeURIComponent(window.location.search.substring(1));
        let vars = query.split('&');
        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split('=');
            if (pair[0] === variable) {
                return pair[1];
            }
        }
        return null;
    }
}
