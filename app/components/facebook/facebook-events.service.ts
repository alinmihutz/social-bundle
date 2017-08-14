import {Injectable} from "@angular/core";
import {SessionService} from "../../services/session.service";
import {Http} from "@angular/http";
import {API_CONFIG} from "../../config/app.routes.config";
import {contentHeaders} from "../../http/headers";

@Injectable()
export class FacebookEventsService {
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
        url += API_CONFIG.routes.facebook.feeds.replace('{accessToken}', accessToken);
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

        console.log(url);
        return this.http.get(url);
    }
}
