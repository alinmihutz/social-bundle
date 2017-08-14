import {Injectable} from "@angular/core";
import {Http, RequestOptions, Response} from "@angular/http";
import {contentHeaders} from "../http/headers";
import {API_CONFIG} from "../config/app.routes.config";
import {User} from "../components/shared/user";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OAuthService {
    constructor(
        private http: Http
    ) { }

    oauth(
        provider: string,
        accessCode: string,
        accessCodeSecret: string,
        loginId: string
    ) {
        let url = API_CONFIG.host;
        url += API_CONFIG.routes.user.replace('{provider}', provider);
        let body = JSON.stringify({
            access_code: accessCode,
            access_code_secret: null !== accessCodeSecret ? accessCodeSecret : null,
            login_id: null !== loginId ? loginId : null
        });
        return this.http.post(url, body, { headers: contentHeaders });
    }
}