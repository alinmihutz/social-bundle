import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../services/session.service";
import {FacebookPostsService} from "./facebook-posts.service";
import {FacebookPosts} from "./facebook-posts";
import {FacebookPost} from "./facebook-post";
import {User} from "../shared/user";

@Component({
    selector: 'fb-posts',
    templateUrl: './app/components/facebook/facebook-posts.component.html',
    styleUrls: ['./app/components/facebook/facebook-posts.component.css']
})

export class FacebookPostsComponent {
    private posts: FacebookPosts;

    constructor(
        private session: SessionService,
        private service: FacebookPostsService
    ) {
        this.loadPosts();
    }

    user() {
        return this.session.getUsersByApp('facebook');
    }

    loadPosts() {
        let tokens = this.session.getTokensByApp('facebook');

        let facebook_posts = new FacebookPosts();

        for (let key in tokens) {
            let token = tokens[key];
            let response = this.service.getPosts(token.getId());
            let user = this.session.getUserByAppAndToken('facebook', token.getId());

            if (user instanceof User) {
                response.subscribe(
                    data => {
                        facebook_posts.setPosts(this.enrichFbPost(data.json(), user));
                    },
                    err => this.loadPostsFailedCallback('Api error!'));
            }
        }
        
        this.posts = facebook_posts;
    }

    private enrichFbPost(messages: any, user: User) {
        let posts = [];
        for (let i in messages) {
            let msg = messages[i];
            let fb_post = new FacebookPost();
            if (fb_post.getUser() == null) {
                fb_post.setUser(user);
            }
            fb_post.setCreatedTime(msg.created_time);
            fb_post.setMessage(msg.message);
            posts.push(fb_post)
        }

        return posts;
    }
    loadPostsFailedCallback(err: string) {
        console.log('[Err]FacebookPostsComponent: ' + err);
        this.posts = new FacebookPosts();
    }

    /**Create post*/
    createPost(ev: any, formData: any) {
        // ev.preventDefault();
        // let user = this.session.getUser('facebook');
        // let data = {
        //     accessToken: this.session.getToken('facebook').getId(),
        //     userId: user.getId(),
        //     message: formData.message
        // };
        //
        // let response = this.service.postMessage(data);
        // response.subscribe(
        //     data => this.createPostSuccessCallback(data.json()),
        //     err => this.createPostFailedCallback('Api error!'));
    }

    createPostSuccessCallback(payload: Object) {
        console.log('createPostSuccessCallback');
        console.log(payload);
    }
    createPostFailedCallback(err: string) {
        console.log('[Err]FacebookPostsComponent: ' + err);
    }
}
