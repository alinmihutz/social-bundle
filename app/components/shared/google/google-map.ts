import {Component, EventEmitter, Output} from '@angular/core';

import {
    MouseEvent,
} from 'angular2-google-maps/core';

@Component({
    selector: 'google-map',
    template: `
        <sebm-google-map
            [latitude]="lat"
            [longitude]="lng"
            (mapClick)="mapClicked($event)">

            <sebm-google-map-marker
                [latitude]="lat"
                [longitude]="lng">
            </sebm-google-map-marker>
        </sebm-google-map>
    `,
})

export class GoogleMap {
    @Output() onMapClicked = new EventEmitter<any>();
    lat: number = 46.768333;
    lng: number = 23.572222;

    mapClicked($event: MouseEvent) {
        this.lat = $event.coords.lat,
            this.lng = $event.coords.lng
        this.onMapClicked.emit($event);
    }

    getLat() {
        return this.lat;
    }

    getLng() {
        return this.lng;
    }
}