import {User} from "../shared/user";
export class InstagramMedia {
    private _user: User = null;
    private _original_image_url: string;
    private _thumbnail_image_url: string;
    private _created_time: string;
    private _caption_text: string;

    createdTimeAsDate() {
        return new Date(this._created_time);
    }

    getUser():User {
        return this._user;
    }

    setUser(value:User) {
        this._user = value;
    }

    setOriginalImageUrl(url:string) {
        this._original_image_url = url;
    }

    getOriginalImageUrl() {
        return this._original_image_url;
    }

    setThumbnailImageUrl(url:string) {
        this._thumbnail_image_url = url;
    }

    getThumbnailImageUrl() {
        return this._thumbnail_image_url;
    }

    setCaptionText(text:string) {
        this._caption_text = text;
    }

    getCaptionText() {
        return this._caption_text;
    }

    getCreatedTime():string {
        return this._created_time;
    }

    setCreatedTime(value:string) {
        this._created_time = value;
    }
}