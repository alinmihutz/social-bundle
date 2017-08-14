import {Component} from '@angular/core';

@Component({
    templateUrl: './app/components/home/home.component.html',
})

export class HomeComponent {
    onMapClicked($event: any) {
        console.log('map clicked');
    }
}
