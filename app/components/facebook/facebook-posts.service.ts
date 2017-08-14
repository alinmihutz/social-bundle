import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {contentHeaders} from "../../http/headers";
import {SessionService} from "../../services/session.service";
import {API_CONFIG} from "../../config/app.routes.config";

@Injectable()
export class FacebookPostsService {
    private host: string;
    constructor(
        private http: Http,
        private session: SessionService
    ) {
        this.host = API_CONFIG.host;
    }

    postMessage(post: Object) {
        let url = this.host;
        url += API_CONFIG.routes.facebook.posts;
        return this.http.post(url, JSON.stringify(post), { headers: contentHeaders });
    }

    getPosts(accessToken: string) {
        let url = this.host;
        url += API_CONFIG.routes.facebook.feeds.replace('{token}', accessToken);
        return this.http.get(url);
    }

    getEvents(accessToken: string, lat: any, lng: any, limit: any, distance: any) {
        let url = this.host;
        url += API_CONFIG.routes.facebook.events
            .replace('{access_token}', accessToken)
            .replace('{lng}', lng)
            .replace('{lat}', lat)
            .replace('{limit}', limit)
            .replace('{distance}', distance);
        return this.http.get(url);
    }
}
