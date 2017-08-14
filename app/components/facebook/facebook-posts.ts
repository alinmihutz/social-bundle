import {FacebookPost} from "./facebook-post";

export class FacebookPosts {
    private _posts: FacebookPost[] = [];

    getPosts():FacebookPost[] {
        return this._posts;
    }

    addPost(post:FacebookPost) {
        this._posts.push(post);
    }

    setPosts(posts:FacebookPost[]) {
        this._posts = posts;
    }

    length() {
        return this._posts.length;
    }
}
