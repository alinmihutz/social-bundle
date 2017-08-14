import {Component} from '@angular/core';
import {SessionService} from "../../services/session.service";
import {GoogleMap} from "../shared/google/google-map";
import {FacebookEventsService} from "./facebook-events.service";
import {Slider} from '../shared/directives/slider';

@Component({
    selector: 'fb-events',
    templateUrl: './app/components/facebook/facebook-events.component.html',
    styleUrls: ['./app/components/facebook/facebook-events.component.css'],
    providers: [GoogleMap]
})

export class FacebookEventsComponent {
    lat: number;
    lng: number;
    private events: any = [];
    constructor(
        private service: FacebookEventsService,
        private session: SessionService,
        private map: GoogleMap
    ) {
        this.lat = this.map.getLat();
        this.lng = this.map.getLng();
    }

    stringAsDate(dateStr: any) {
        return new Date(dateStr);
    }

    /** Listens on map clicked */
    onMapClicked($event: any) {
        this.lat = $event.coords.lat;
        this.lng = $event.coords.lng;
    }

    /**Create event*/
    createEvent(ev: any, event: Object) {
        ev.preventDefault();
        console.log(JSON.stringify(event));
    }

    /**Search events */
    searchEvents(ev: any, formData: any) {
        ev.preventDefault();
        let tokens = this.session.getTokensByApp('facebook');

        let response = this.service.getEvents(
            tokens[0].getId(),
            document.getElementById("lat").getAttribute('value'),
            document.getElementById("lng").getAttribute('value'),
            document.getElementById("limit").getAttribute('value'),
            document.getElementById("distance").getAttribute('value')
        );
        response.subscribe(
            data => this.searchEventsSuccessCallback(data.json()),
            err => this.searchEventsFailedCallback('Api error!'));
    }

    searchEventsSuccessCallback(events: Object) {
        this.events = events;
    }
    searchEventsFailedCallback(err: string) {
        console.log('[Err]FacebookEventsComponent: ' + err);
        this.events = [];
    }
}
