import {AuthService} from "./auth.service";
import {SessionService} from "./session.service";
import {OAuthService} from "./oauth.service";
import {FacebookPostsService} from "../components/facebook/facebook-posts.service";
import {FacebookEventsService} from "../components/facebook/facebook-events.service";
import {InstagramService} from "./instagram/instagram.service";
export const appServices = [
    AuthService,
    SessionService,
    OAuthService,
    FacebookPostsService,
    FacebookEventsService,
    InstagramService
];