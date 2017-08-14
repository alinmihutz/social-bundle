import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../services/session.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
    templateUrl: './app/components/socialbundle/social-bundle.component.html',
    styleUrls: ['./app/components/socialbundle/social-bundle.component.css'],
})

export class SocialBundleComponent implements OnInit {
    constructor(
        private sessionService: SessionService,
        private authService: AuthService,
        private router: Router
    ) {
    }

    ngOnInit() {
        if (!this.authenticated) {
            this.router.navigate(['/login']);
        }
    }

    dispatchResizeEvent() {
        //fix -> load map canvas (in tab) before the element is show in your dom
        setTimeout(function(){
            window.dispatchEvent(new Event("resize"));
        }, 1);
    }

    socialLogin(provider: string): void {
        this.sessionService.addApp(provider);
        this.authService.getSocialLoginUrl(provider).then(authUrl => window.location.replace(authUrl));
    }

    loggedWith(app: string) {
        return this.sessionService.loggedWith(app);
    }

    get provider() {
        return this.sessionService.getAppName();
    }

    get apps() {
        return this.sessionService.getApps();
    }

    get authenticated() {
        return this.authService.isAuthenticated();
    }

    getUser(app: string) {
        return this.sessionService.getUsersByApp(app);
    }

    get users() {
        let usersArr = [];
        let users = this.sessionService.getUsers();
        Object.keys(users).forEach(function (app) {
            Object.keys(users[app]).forEach(function (i) {
                usersArr.push(users[app][i]);
            });
        });

        return usersArr;
    }
}