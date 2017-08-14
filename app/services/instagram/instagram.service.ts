import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {contentHeaders} from "../../http/headers";
import {SessionService} from "../../services/session.service";
import {API_CONFIG} from "../../config/app.routes.config";

@Injectable()
export class InstagramService {
    private host: string;
    constructor(
        private http: Http,
        private session: SessionService
    ) {
        this.host = API_CONFIG.host;
    }

    getUserMedia(accessToken: string) {
        let url = this.host;
        url += API_CONFIG.routes.instagram.user_media.replace('{token}', accessToken);
        return this.http.get(url);
    }
}
