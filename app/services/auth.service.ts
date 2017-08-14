import {Injectable} from '@angular/core';
import {SessionService} from "./session.service";
import {API_CONFIG} from "../config/app.routes.config";
import {Http, Response} from "@angular/http";
import {User} from "../components/shared/user";
import 'rxjs/add/operator/toPromise';
import {contentHeaders} from "../http/headers";

@Injectable()
export class AuthService {
    private host: string;

    constructor(
        private http: Http,
        private sessionService: SessionService
    ) {
        this.host = API_CONFIG.host;
    }

    public isAuthenticated() {
        return (this.sessionService.getUsers() !== null);
    }

    login(credentials: Object) {
        let url = this.host;
        url += API_CONFIG.routes.login;
        return this.http.post(url, JSON.stringify(credentials), { headers: contentHeaders });
    }

    signIn(user: Object) {
        let url = this.host + API_CONFIG.routes.signin;
        return this.http.post(url, JSON.stringify(user), { headers: contentHeaders });
    }

    getSocialLoginUrl(provider: string): Promise<string> {
        let url = this.host;
        url += API_CONFIG.routes.socialLogin.replace('{provider}', provider);
        return this.http.get(url)
            .toPromise()
            .then(this.extractAuthUrl)
            .catch(this.handleError);
    }

    private extractAuthUrl(res: Response) {
        let url = res.json();
        return url || null;
    }

    private handleError(err: any) {
        console.log('getSocialLoginUrl failed');
        return null;
    }
}
