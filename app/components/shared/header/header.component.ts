import {Component, NgModule} from '@angular/core';

import {CollapseDirective} from 'ng2-bootstrap/ng2-bootstrap';

import {AuthService} from "../../../services/auth.service";
import {SessionService} from "../../../services/session.service";

@NgModule({
    imports: [CollapseDirective]
})

@Component({
    selector: 'header',
    templateUrl: './app/components/shared/header/header.component.html',
    styleUrls: ['./app/components/shared/header/header.component.css']
})
export class HeaderComponent {
    public isCollapsed: boolean = true;

    constructor(
        private authService: AuthService,
        private sessionService: SessionService
    ) { }

    get authenticated() {
        return this.authService.isAuthenticated();
    }

    socialLogin(provider: string): void {
        this.sessionService.addApp(provider);
        this.authService.getSocialLoginUrl(provider).then(
            authUrl => window.location.replace(authUrl
        ));
    }

    loggedWith(app: string): boolean {
        return this.sessionService.loggedWith(app);
    }

    get page() {
        return location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
    }
}
