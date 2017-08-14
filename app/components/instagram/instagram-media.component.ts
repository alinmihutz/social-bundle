import {Component} from "@angular/core";
import {InstagramService} from "../../services/instagram/instagram.service";
import {SessionService} from "../../services/session.service";
import {User} from "../shared/user";
import {InstagramMedia} from "./instagram.media";
@Component({
    selector: 'instagram-user-media',
    templateUrl: './app/components/instagram/instagram-media.component.html',
    styleUrls: ['./app/components/instagram/instagram-media.component.css']
})

export class InstagramMediaComponent {
    private medias: InstagramMedia[];
    constructor(
        private session: SessionService,
        private service: InstagramService
    ) {
        this.loadMedias();
    }

    loadMedias() {
        let tokens = this.session.getTokensByApp('instagram');
        let medias_arr = [];
        
        for (let key in tokens) {
            let token = tokens[key];
            let response = this.service.getUserMedia(token.getId());
            let user = this.session.getUserByAppAndToken('instagram', token.getId());

            if (user instanceof User) {
                response.subscribe(
                    data => {
                        let medias = data.json();

                        for (let i in medias) {
                            let media = medias[i];

                            let instagram_media = new InstagramMedia();
                            if (null == instagram_media.getUser()) {
                                instagram_media.setUser(user);
                            }
                            instagram_media.setCaptionText(media.caption.text);
                            instagram_media.setCreatedTime(media.caption.created_time);
                            instagram_media.setOriginalImageUrl(media.images.standard_resolution.url);
                            instagram_media.setThumbnailImageUrl(media.images.thumbnail.url);

                            medias_arr.push(instagram_media);
                        }
                    },
                    err => {
                       console.log('InstagramMediaComponent err !')
                    }
                );
            }
        }
        
        this.medias = medias_arr;
        console.log(this.medias);
    }
}