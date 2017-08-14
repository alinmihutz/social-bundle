import {User} from "../shared/user";
export class FacebookPost {
    private _user: User = null;
    private _created_time: string;
    private _message: string;
    private _story: string;

    createdTimeAsDate() {
        return new Date(this._created_time);
    }

    getUser():User {
        return this._user;
    }

    setUser(value:User) {
        this._user = value;
    }

    getStory():string {
        return this._story;
    }

    setStory(value:string) {
        this._story = value;
    }

    getMessage():string {
        return this._message;
    }

    setMessage(value:string) {
        this._message = value;
    }

    getCreatedTime():string {
        return this._created_time;
    }

    setCreatedTime(value:string) {
        this._created_time = value;
    }
}