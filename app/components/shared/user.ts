import {SB_CONFIG, USER_ROLES} from '../../config/app.config';

export class User {
    id: number;
    access_token: string;
    token_expires_at: string;
    username: string;
    fullname: string;
    picture_src: string;
    role: string;
    app: string;

    constructor(user: any) {
        this.id = user.id;
        this.access_token = user.access_token;
        this.token_expires_at = user.token_expires_at;
        this.username = user.username;
        this.fullname = user.fullname;
        this.picture_src = user.picture_src ? user.picture_src : SB_CONFIG.defaultPictureUrl;
        this.role = user.role ? user.role : USER_ROLES.member;
        this.app = user.app ? user.app : SB_CONFIG.app;
    }

    serialize() {
        return JSON.stringify({
            id: this.id,
            access_token: this.access_token,
            token_expires_at: this.token_expires_at,
            username: this.username,
            fullname: this.fullname,
            picture_src: this.picture_src,
            role: this.role,
            app: this.app
        });
    }

    getId() {return this.id;}
    getAccessToken() {return this.access_token;}
    getTokenExpAt() {return this.token_expires_at;}
    getName() {return this.username;}
    getFullName() {return this.fullname;}
    getPictureSrc() {return this.picture_src;}
    getRole() {return this.role;}
    getApp() {return this.app;}
}