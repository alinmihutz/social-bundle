import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {SessionService} from '../../services/session.service';

@Component({
    template: ''
})
export class LogoutComponent {

    constructor(
        private session: SessionService,
        private router: Router
    ) {
        this.session.clearSessionState();
        this.router.navigate(['/login']);
    }
}
